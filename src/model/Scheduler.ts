export class Scheduler {
    constructor(
      private id: string,
      private day: Date,
      private hours: Number,
      private availability: Number,
      private price:Number,
    ) {}
  
    public getId(): string {
      return this.id;
    }
  
    public getDay(): Date {
      return this.day;
    }
    public getHours(): Number {
      return this.hours;
    }
  
    public getAvailability(): Number {
      return this.availability;
    }
  
    public getPrice(): Number {
      return this.price;
    }
  
}

export interface InputScheduler{
  id:string
  day:Date
  hours:Number
  availability:Number
  price:Number
}