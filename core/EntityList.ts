import MEntity = module("core/Entity");

export module ash.core
{
	/**
	 * An export class for a linked list of entities. Used inside the framework for
	 * managing the entities.
	 */
	export class EntityList
	{
	    public head: MEntity.ash.core.Entity;
	    public tail: MEntity.ash.core.Entity;

	    constructor() {
	    }
        		
        public add(entity: MEntity.ash.core.Entity )
		{
			if( ! this.head )
			{
			    this.head = this.tail = entity;
				entity.next = entity.previous = null;
			}
			else
			{
			    this.tail.next = entity;
			    entity.previous = this.tail;
				entity.next = null;
				this.tail = entity;
			}
		}
		
        public remove(entity: MEntity.ash.core.Entity )
		{
		    if (this.head == entity)
			{
		        this.head = this.head.next;
			}
		    if (this.tail == entity)
			{
		        this.tail = this.tail.previous;
			}
			
			if (entity.previous)
			{
				entity.previous.next = entity.next;
			}
			
			if (entity.next)
			{
				entity.next.previous = entity.previous;
			}
			// N.B. Don't set node.next and node.previous to null because that will break the list iteration if node is the current node in the iteration.
		}
		
		private _removeAll() 
		{
		    while (this.head)
			{
		        var entity: MEntity.ash.core.Entity = this.head;
				this.head = this.head.next;
				entity.previous = null;
				entity.next = null;
			}
			this.tail = null;
		}
	}
}
