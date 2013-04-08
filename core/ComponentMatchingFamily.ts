import MEngine = module("core/Engine");
import MEntity = module("core/Entity");
import MSystem = module("core/System");
import MEntityList = module("core/EntityList");
import MSystemList = module("core/SystemList");
import MNodeList = module("core/NodeList");
import MNode = module("core/Node");
import MNodePool = module("core/NodePool");
import MFamily = module("core/IFamily");

import MSignal = module("tools/Signal");
import MDictionary = module("tools/Dictionary");

export module ash.core
{
	//import flash.utils.Dictionary;
	//import flash.utils.describeType;
	//import flash.utils.getDefinitionByName;

	/**
	 * The default class for managing a NodeList. This class creates the NodeList and adds and removes
	 * nodes to/from the list as the entities and the components in the engine change.
	 * 
	 * It uses the basic entity matching pattern of an entity system - entities are added to the list if
	 * they contain components matching all the public properties of the node class.
	 */
    export class ComponentMatchingFamily implements MFamily.ash.core.IFamily
	{
        private _nodes: MNodeList.ash.core.NodeList;
        private _entities: MDictionary.ash.tools.Dictionary;
		private _nodeClass;
		private _components: MDictionary.ash.tools.Dictionary;
		private _nodePool: MNodePool.ash.core.NodePool;
		private _engine: MEngine.ash.core.Engine;

		/**
		 * The constructor. Creates a ComponentMatchingFamily to provide a NodeList for the
		 * given node class.
		 * 
		 * @param nodeClass The type of node to create and manage a NodeList for.
		 * @param engine The engine that this family is managing teh NodeList for.
		 */
		constructor(nodeClass, engine: MEngine.ash.core.Engine )
		{
			this._nodeClass = nodeClass;
			this._engine = engine;

			this._nodePool = new MNodePool.ash.core.NodePool(this._nodeClass);
			this._nodes = new MNodeList.ash.core.NodeList();
			this._entities = new MDictionary.ash.tools.Dictionary();

			this._components = new MDictionary.ash.tools.Dictionary();
			this._nodePool.dispose(this._nodePool.get()); // create a dummy instance to ensure describeType works.

			var nodeClassPrototype = this._nodeClass.prototype;

			for (var property in nodeClassPrototype) {
			    ///TODO - tidy this up...
			    if (nodeClassPrototype.hasOwnProperty(property) &&
                    property != "types" &&
                    property != "next" &&
                    property != "previous" &&
                    property != "constructor" &&
                    property != "super" &&
                    property != "extend" &&
                    property != "entity") {
			        var componentObject = nodeClassPrototype["types"][property];
			        this._components.add(componentObject, property);
			    }
			}

			this._init();
		}

		/**
		 * Initialises the class. Creates the nodelist and other tools. Analyses the node to determine
		 * what component types the node requires.
		 */
		private _init() 
		{



		}
		
		/**
		 * The nodelist managed by this family. This is a reference that remains valid always
		 * since it is retained and reused by Systems that use the list. i.e. we never recreate the list,
		 * we always modify it in place.
		 */
		public nodeList(): MNodeList.ash.core.NodeList
		{
			return this._nodes;
		}

		/**
		 * Called by the engine when an entity has been added to it. We check if the entity should be in
		 * this family's NodeList and add it if appropriate.
		 */
		public newEntity(entity: MEntity.ash.core.Entity )
		{
			this.addIfMatch( entity );
		}
		
		/**
		 * Called by the engine when a component has been added to an entity. We check if the entity is not in
		 * this family's NodeList and should be, and add it if appropriate.
		 */
		public componentAddedToEntity(entity: MEntity.ash.core.Entity, componentClass: () => any  )
		{
		    this.addIfMatch( entity );
		}
		
		/**
		 * Called by the engine when a component has been removed from an entity. We check if the removed component
		 * is required by this family's NodeList and if so, we check if the entity is in this this NodeList and
		 * remove it if so.
		 */
		public componentRemovedFromEntity(entity: MEntity.ash.core.Entity, componentClass: () => any  )
		{
		    if (this._components.has(componentClass))
			{
			    this.removeIfMatch( entity );
			}
		}
		
		/**
		 * Called by the engine when an entity has been rmoved from it. We check if the entity is in
		 * this family's NodeList and remove it if so.
		 */
		public removeEntity(entity: MEntity.ash.core.Entity )
		{
			this.removeIfMatch( entity );
		}
		
		/**
		 * If the entity is not in this family's NodeList, tests the components of the entity to see
		 * if it should be in this NodeList and adds it if so.
		 */
		public addIfMatch(entity: MEntity.ash.core.Entity )
		{
		    if (!this._entities.getValue(entity))
			{
				var componentClass : any;
				for (componentClass in this._components )
				{
					if ( !entity.has( componentClass ) )
					{
						return;
					}
				}
				var node: MNode.ash.core.Node = this._nodePool.get();
				node.entity = entity;
				for (componentClass in this._components )
				{
				    node[this._components[componentClass]] = entity.get( componentClass );
				}
				this._entities.add(entity, node);
				this._nodes.add( node );
			}
		}
		
		/**
		 * Removes the entity if it is in this family's NodeList.
		 */
		public removeIfMatch(entity: MEntity.ash.core.Entity )
		{
		    if (this._entities.getValue(entity))
			{
		        var node: MNode.ash.core.Node = this._entities.getValue(entity);
		        this._entities.remove(entity);
				this._nodes.remove( node );
				if( this._engine.updating )
				{
				    this._nodePool.cache( node );
				    this._engine.updateComplete.add( this._releaseNodePoolCache, this );
				}
				else
				{
					this._nodePool.dispose( node );
				}
			}
		}
		
		/**
		 * Releases the nodes that were added to the node pool during this engine update, so they can
		 * be reused.
		 */
		private _releaseNodePoolCache() 
		{
		    this._engine.updateComplete.remove( this._releaseNodePoolCache );
		    this._nodePool.releaseCache();
		}
		
		/**
		 * Removes all nodes from the NodeList.
		 */
		public cleanUp() 
		{
		    for (var node: MNode.ash.core.Node = this._nodes.head; node; node = node.next )
			{
		        this._entities.remove(node.entity);
			}
			this._nodes.removeAll();
		}


	}
}
