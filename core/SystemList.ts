import MSystem = module("core/System");

export module ash.core
{
	/**
	 * Used internally, this is an ordered list of Systems for use by the engine update loop.
	 */
	export class SystemList
	{
	    public head: MSystem.ash.core.System;
		public tail : MSystem.ash.core.System;
		
		public add( system : MSystem.ash.core.System ) 
		{
			if( ! this.head )
			{
				this.head = this.tail = system;
				system.next = system.previous = null;
			}
			else
			{
				for( var node = this.tail; node; node = node.previous )
				{
					if( node.priority <= system.priority )
					{
						break;
					}
				}
				if( node == this.tail )
				{
					this.tail.next = system;
					system.previous = this.tail;
					system.next = null;
					this.tail = system;
				}
				else if( !node )
				{
					system.next = this.head;
					system.previous = null;
					this.head.previous = system;
					this.head = system;
				}
				else
				{
					system.next = node.next;
					system.previous = node;
					node.next.previous = system;
					node.next = system;
				}
			}
		}
		
		public remove( system : MSystem.ash.core.System ) 
		{
			if ( this.head == system)
			{
				this.head = this.head.next;
			}
			if ( this.tail == system)
			{
				this.tail = this.tail.previous;
			}
			
			if (system.previous)
			{
				system.previous.next = system.next;
			}
			
			if (system.next)
			{
				system.next.previous = system.previous;
			}
			// N.B. Don't set system.next and system.previous to null because that will break the list iteration if node is the current node in the iteration.
		}
		
		public removeAll() 
		{
			while( this.head )
			{
				var system = this.head;
				this.head = this.head.next;
				system.previous = null;
				system.next = null;
			}
			this.tail = null;
		}
		
		public get( type  ) : MSystem.ash.core.System
		{
			for( var system = this.head; system; system = system.next )
			{
				if (system.is(type))
				{
					return system;
				}
			}
			return null;
		}
	}
}
