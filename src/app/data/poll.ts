export class Poll {
    
    constructor(
        public creator: string,    
        public title : string,   
        public question : string,  
        public options: {}
    ) {}
 
    // getOptionStrings() {
    //     return Object.keys(this.options);
    // }
    
    // getTotalVotes() {
    //     return Object.keys(this.options)
    //         .map(o => this.options[o])
    //         .reduce(
    //             (prev, curr) => prev + curr
    //         );
    // }
      
    // addOption(option: string) {
    //     this.options[option] = 0;
    // }
    
    // getPercentage(option: string): number {
    //     return +this.options[option] / +this.getTotalVotes();

    // }
} 