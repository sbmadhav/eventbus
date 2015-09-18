/** Event Bus is a class that is used to implement a common flavor of Observer design pattern call publish-subscribe model.
 *	public apis : add, remove and trigger
 *	Usage:
 *
 *		var eventBus = new EventBus();
 *	// To Add or Subscribe to a new topic
 *		eventBus.add('myEvent1',function(){console.log('hi')},function(){console.log('bye')});
 *	// To Trigger an existing topic
 *		eventBus.trigger('myEvent1')
 *	// To Remove an existing topic
 *		eventBus.remove( 'myEvent1',function(){console.log('hi')}); 
 *	// Or 
 *		eventBus.remove( 'myEvent1');
*/ 
( function ( NS ){

 	'use strict';
	NS.EventBus = function () {
		//topics is a map like structure
		var topics = {};

		/** Add method subscribes to a specific event. If the event already exists the callbacks are appended to it
		*	It takes multiple arguments, first is the event name and the rest are callbacks (accessed using the default arguments parameter)
		* 	@function add
 		* 	@param {string} eventName ; other params are obtained from inbuilt arguments obejct
 		* 	@return {boolean} state to indicate the success or failure of the add / subscribe event.
		*/
		this.add = function ( eventName ) {
			topics[ eventName ] = topics[ eventName ] || [];
			if ( eventName && typeof eventName === 'string' && arguments.length > 1 ) {

				for ( var i = 1; i < arguments.length; i++ ) {
				
					topics[ eventName ].push( arguments[i] );

				}

				// console.log( 'Event ' + eventName + ' has been successfuly subscribed' );
				return true;

			} 
			else {

				// console.error( eventName ? eventName + 'subscription failed with errors' : 'Error occurred during event subscription' );
				return false ;
			}

		};

		/** Remove method removes to a specific callback to the event id or removes all callback (if no second argument is passed)
		*	It takes 2 arguments, event name and callbacks (accessed using the default arguments parameter)
		* 	@function remove
 		* 	@param {string} eventName ; other params are obtained from inbuilt arguments obejct
 		* 	@return {boolean} state to indicate the success or failure of the add / subscribe event.
		*/
		this.remove = function ( eventName ) {

			if ( eventName && typeof eventName === 'string' && topics[ eventName ] ) {
				if ( arguments.length === 1 ) {
					//TODO: Usage of delete needs to reconsidered
					delete topics[ eventName ];
					return 'Event ' + eventName + ' has been successfuly removed';

				} else {
					//TODO: Order is O[N(pow2)]. Needs to be made simpler
					for ( var j = 0; j < arguments.length; j++ ) {
						for ( var i = 0; i < topics[ eventName ].length; i++ ) {
							if ( topics[ eventName ][ i ].toString( ) === arguments[ j ].toString( ) ) {
								topics[ eventName ].splice( i , 1 );
								break;
							}
						}	
					}

					// console.log( 'Event ' + eventName + ' has been successfuly altered' );
					return true;
				}

			} else {

				// console.error(  eventName ? eventName + 'unsubscription failed with errors' : 'Error occurred during event unsubscription' );
				return false ;
			}

		};

		///Trigger method publishes the event, with a second optional data argument.
		this.trigger = function ( eventName , data ) {
			if ( topics[ eventName ] ) {

				topics[ eventName ].map ( function  ( callback ) {
					callback( data );
				} );
				// console.log( 'Event ' + eventName + ' has been successfuly published' );
				return true;
			}
			else {
				// console.error( 'No Topic with the Event ID - ' + eventName + ' exists' );
				return false;
			}
		};

	};
} )( window );
