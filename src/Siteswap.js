
import { Juggle }       from "./Juggle";
import { validate }     from "./Siteswap.validate";
import { truncate }     from "./Siteswap.truncate";
import { schedulise }   from "./Siteswap.schedulise";
import { orbitise }     from "./Siteswap.orbitise";
import { decompose }    from "./Siteswap.decompose";
import { excitify }     from "./Siteswap.excitify";
import { log }          from "./Siteswap.log";


class Siteswap extends Juggle {
   
   constructor( input, legacy = true ){

      super(input, legacy);

      if( !this.valid )
         return this;

      try{

         this.validate(this.throws, this.hands);
         this.valid = true;

      }
      catch(e){

         // Unset properties set in `Juggle`.
         const keys = Object.keys(this).filter(key => key !== "input");
         for( const key of keys )
            delete this[key];

         this.valid = false;
         this.message = e.message;
         return this;
         
      }


      // Truncate throw sequence repetitions before anything else.
      this.truncate(this.throws);


      // Set in `Juggle`:
      //  this.hands
      //  this.throws
      //  this.degree
      //  this.props
      //  this.greatestValue
      //  this.multiplex
      //  this.string

      this.states        = this.greatestValue === 0 ? [] : this.schedulise( this.throws, false );
      this.strictStates  = this.greatestValue === 0 ? [] : this.schedulise( this.throws, true );
      this.orbits        = this.orbitise(this.throws, this.hands);
      this.composition   = this.decompose(this.states, this.throws, this.hands);
      
      this.period        = this.states.length;
      this.fullPeriod    = this.strictStates.length;
      this.prime         = this.composition.length === 1;

      this.groundState   = this.excitify();

   }

}

Siteswap.prototype.validate     = validate;
Siteswap.prototype.truncate     = truncate;
Siteswap.prototype.schedulise   = schedulise;
Siteswap.prototype.excitify     = excitify;
Siteswap.prototype.orbitise     = orbitise;
Siteswap.prototype.decompose    = decompose;
Siteswap.prototype.log          = log;

export { Siteswap };