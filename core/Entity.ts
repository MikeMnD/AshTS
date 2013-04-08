import MSignal = module("tools/Signal");
//export class Signal extends MSignal.Signal {}

import MDictionary = module("tools/Dictionary");
//export class Dictionary extends MDictionary.ash.tools.Dictionary {}

export module ash.core
{

	/**
	 * An entity is composed from components. As such, it is essentially a collection object for components. 
	 * Sometimes, the entities in a game will mirror the actual characters and objects in the game, but this 
	 * is not necessary.
	 * 
	 * <p>Components are simple value objects that contain data relevant to the entity. Entities
	 * with similar functionality will have instances of the same components. So we might have 
	 * a position component</p>
	 * 
	 * <p><code>export class PositionComponent
	 * {
	 *   public x :number;
	 *   public y :number;
	 * }</code></p>
	 * 
	 * <p>All entities that have a position in the game world, will have an instance of the
	 * position component. Systems operate on entities based on the components they have.</p>
	 */
	export class Entity
	{

		/**
		 * Optional, give the entity a name. This can help with debugging and with serialising the entity.
		 */
		public name: string;
		/**
		 * This signal is dispatched when a component is added to the entity.
		 */
		public componentAdded: MSignal.Signal;
		/**
		 * This signal is dispatched when a component is removed from the entity.
		 */
		public componentRemoved: MSignal.Signal;
		
		public previous : Entity;
		public next : Entity;
		private _components: MDictionary.ash.tools.Dictionary;

		constructor()
		{
		    this.componentAdded = new MSignal.Signal();
		    this.componentRemoved = new MSignal.Signal();
			this._components = new MDictionary.ash.tools.Dictionary();
		}

		/**
		 * Add a component to the entity.
		 * 
		 * @param component The component object to add.
		 * @param componentClass The class of the component. This is only necessary if the component
		 * extends another component class and you want the framework to treat the component as of 
		 * the base class type. If not set, the class type is determined directly from the component.
		 * 
		 * @return A reference to the entity. This enables the chaining of calls to add, to make
		 * creating and configuring entities cleaner. e.g.
		 * 
		 * <code>var entity : Entity = new Entity()
		 *     .add( new Position( 100, 200 )
		 *     .add( new Display( new PlayerClip() );</code>
		 */
		public add( component: any, componentClass  = null ): Entity
		{
			if ( !componentClass )
			{
			    componentClass = component.prototype;
			}
			if ( this._components.has(componentClass))
			{
			    this.remove(componentClass);
			}
			this._components.add(componentClass, component);
			this.componentAdded.dispatch( this, componentClass );
			return this;
		}

		/**
		 * Remove a component from the entity.
		 * 
		 * @param componentClass The class of the component to be removed.
		 * @return the component, or null if the component doesn't exist in the entity
		 */
		public remove( componentClass  ): any
		{
		    var component: any = this._components.getValue(componentClass);
			if (component)
			{
			    this._components.remove[ componentClass ];
				this.componentRemoved.dispatch( this, componentClass );
				return component;
			}
			return null;
		}

		/**
		 * Get a component from the entity.
		 * 
		 * @param componentClass The class of the component requested.
		 * @return The component, or null if none was found.
		 */
		public get (componentClass: any  ) : any
		{
			return this._components.getValue(componentClass.prototype);
		}
		
		/**
		 * Get all components from the entity.
		 * 
		 * @return An array containing all the components that are on the entity.
		 */
		public getAll(): any[]
		{
		    var componentArray = [];

		    this._components.forEach(
                function (componentClass, component) {
                    componentArray.push(component);
                }
            );
			return componentArray;
		}

		/**
		 * Does the entity have a component of a particular type.
		 * 
		 * @param componentClass The class of the component sought.
		 * @return true if the entity has a component of the type, false if not.
		 */
		public has(componentClass: any) :bool
		{
			return this._components.has(componentClass) != null;
		}
	}
}
