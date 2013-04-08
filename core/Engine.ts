import MEntity = module("core/Entity");
import MSystem = module("core/System");
import MEntityList = module("core/EntityList");
import MSystemList = module("core/SystemList");
import MNodeList = module("core/NodeList");
import MFamily = module("core/IFamily");
import MComponentMatchingFamily = module("core/ComponentMatchingFamily");


import MSignal = module("tools/Signal");
import MDictionary = module("tools/Dictionary");


export module ash.core
{
	//import ash.signals.Signal0;
	//import flash.utils.Dictionary;

	/**
	 * The Engine class is the central point for creating and managing your game state. Add
	 * entities and systems to the engine, and fetch families of nodes from the engine.
	 */
	export class Engine
	{
	    private _entityList: MEntityList.ash.core.EntityList;
	    private _systemList: MSystemList.ash.core.SystemList;
		private _families: MDictionary.ash.tools.Dictionary;
		
		/**
		 * Indicates if the engine is currently in its update loop.
		 */
		public updating :bool;
		
		/**
		 * Dispatched when the update loop ends. If you want to add and remove systems from the
		 * engine it is usually best not to do so during the update loop. To avoid this you can
		 * listen for this signal and make the change when the signal is dispatched.
		 */
		public updateComplete: MSignal.Signal;
		
		/**
		 * The class used to manage node lists. In most cases the default class is sufficient
		 * but it is exposed here so advanced developers can choose to create and use a 
		 * different implementation.
		 * 
		 * The class must implement the Family interface.
		 */
		public familyClass = MComponentMatchingFamily.ash.core.ComponentMatchingFamily;
		
		constructor()
		{
		    this._entityList = new MEntityList.ash.core.EntityList();
		    this._systemList = new MSystemList.ash.core.SystemList();
		    this._families = new MDictionary.ash.tools.Dictionary();
		    this.updateComplete = new MSignal.Signal();
		}

		get entites() {
		    var tmpEntities = [];
		        for(var entity = this._entityList.head; entity; entity = entity.next)
            {
		        tmpEntities.push(entity);
            }
            return tmpEntities;
		}
		get systems() {
		    var tmpSystems = [];
		    for (var system = this._systemList.head; system; system = system.next) {
		        tmpSystems.push(system);
		    }
		    return tmpSystems;
		}

		
		/**
		 * Add an entity to the engine.
		 * 
		 * @param entity The entity to add.
		 */
		public addEntity(entity: MEntity.ash.core.Entity ): void
		{
		    this._entityList.add( entity );
		    entity.componentAdded.add(this._componentAdded, this );
		    entity.componentRemoved.add(this._componentAdded, this ); //mike fix
			this._families.forEach(
                function (nodeObject, family: MFamily.ash.core.IFamily) {
                    family.newEntity(entity);
                }
            );
		}
		
		/**
		 * Remove an entity from the engine.
		 * 
		 * @param entity The entity to remove.
		 */
		public removeEntity(entity: MEntity.ash.core.Entity): void
		{
			entity.componentAdded.remove(this._componentAdded, this);
			entity.componentRemoved.remove(this._componentRemoved, this); //mike fix

			this._families.forEach(
                function (nodeObject, family: MFamily.ash.core.IFamily) {
                    family.removeEntity(entity);
                }
            );


			this._entityList.remove( entity );
		}
		
		/**
		 * Remove all entities from the engine.
		 */
		public removeAllEntities(): void
		{
		    while (this._entityList.head )
			{
		        this.removeEntity(this._entityList.head );
			}
		}
		
		/**
		 * Returns a vector containing all the entities in the engine.
		 */
		//public get entities() : Vector.<Entity>
		//{
		//	var entities : Vector.<Entity> = new Vector.<Entity>();
		//	for (var entity: MEntity.ash.core.Entity = entityList.head; entity; entity = entity.next )
		//	{
		//		entities.push( entity );
		//	}
		//	return entities;
		//}
		
		/**
		 * @private
		 */
		private _componentAdded(entity: MEntity.ash.core.Entity, componentClass: () => any  ): void
		{
			this._families.forEach(
                function (nodeObject, family: MFamily.ash.core.IFamily) {
                    family.componentAddedToEntity(entity, componentClass);
                }
            );

		}
		
		/**
		 * @private
		 */
		private _componentRemoved(entity: MEntity.ash.core.Entity, componentClass: () => any  ): void
		{
			this._families.forEach(
                function (nodeObject, family: MFamily.ash.core.IFamily) {
                    family.componentRemovedFromEntity(entity, componentClass);
                }
            );



		}
		
		/**
		 * Get a collection of nodes from the engine, based on the type of the node required.
		 * 
		 * <p>The engine will create the appropriate NodeList if it doesn't already exist and 
		 * will keep its contents up to date as entities are added to and removed from the
		 * engine.</p>
		 * 
		 * <p>If a NodeList is no longer required, release it with the releaseNodeList method.</p>
		 * 
		 * @param nodeClass The type of node required.
		 * @return A linked list of all nodes of this type from all entities in the engine.
		 */
		public getNodeList(nodeClass): MNodeList.ash.core.NodeList
		{
			if( this._families.has(nodeClass) )
			{
			    return this._families.getValue(nodeClass).nodes;
			}
			var family: MFamily.ash.core.IFamily = new this.familyClass( nodeClass, this );
			this._families.add(nodeClass, family);
			for (var entity: MEntity.ash.core.Entity = this._entityList.head; entity; entity = entity.next )
			{
				family.newEntity( entity );
			}
			return family.nodeList();
		}
		
		/**
		 * If a NodeList is no longer required, this method will stop the engine updating
		 * the list and will release all references to the list within the framework
		 * classes, enabling it to be garbage collected.
		 * 
		 * <p>It is not essential to release a list, but releasing it will free
		 * up memory and processor resources.</p>
		 * 
		 * @param nodeClass The type of the node class if the list to be released.
		 */
		public releaseNodeList( nodeClass  ) 
		{
		    if (this._families.has(nodeClass))
			{
		        this._families.getValue(nodeClass).cleanUp();
			}
		    this._families.remove(nodeClass);
		}
		
		/**
		 * Add a system to the engine, and set its priority for the order in which the
		 * systems are updated by the engine update loop.
		 * 
		 * <p>The priority dictates the order in which the systems are updated by the engine update 
		 * loop. Lower numbers for priority are updated first. i.e. a priority of 1 is 
		 * updated before a priority of 2.</p>
		 * 
		 * @param system The system to add to the engine.
		 * @param priority The priority for updating the systems during the engine loop. A 
		 * lower number means the system is updated sooner.
		 */
		public addSystem(system: MSystem.ash.core.System, priority :number )
		{
			system.priority = priority;
			system.addToEngine( this );
			this._systemList.add( system );
		}
		
		/**
		 * Get the system instance of a particular type from within the engine.
		 * 
		 * @param type The type of system
		 * @return The instance of the system type that is in the engine, or
		 * null if no systems of this type are in the engine.
		 */
		public getSystem(type): MSystem.ash.core.System
		{
			return this._systemList.get( type );
		}
		
		/**
		 * Returns a vector containing all the systems in the engine.
		 */
		//public get systems() : Vector.<System>
		//{
		//	var systems : Vector.<System> = new Vector.<System>();
		//	for (var system: MSystem.ash.core.System = systemList.head; system; system = system.next )
		//	{
		//		systems.push( system );
		//	}
		//	return systems;
		//}
		
		/**
		 * Remove a system from the engine.
		 * 
		 * @param system The system to remove from the engine.
		 */
		public removeSystem(system: MSystem.ash.core.System )
		{
			this._systemList.remove( system );
			system.removeFromEngine( this );
		}
		
		/**
		 * Remove all systems from the engine.
		 */
		public removeAllSystems() 
		{
			while( this._systemList.head )
			{
			    this.removeSystem(this._systemList.head );
			}
		}

		/**
		 * Update the engine. This causes the engine update loop to run, calling update on all the
		 * systems in the engine.
		 * 
		 * <p>The module net.richardlord.ash.tick contains classes that can be used to provide
		 * a steady or variable tick that calls this update method.</p>
		 * 
		 * @time The duration, in seconds, of this update step.
		 */
		public update( time :number ) 
		{
			this.updating = true;
			for (var system: MSystem.ash.core.System = this._systemList.head; system; system = system.next )
			{
				system.update( time );
			}
			this.updating = false;
			this.updateComplete.dispatch();
		}
	}
}
