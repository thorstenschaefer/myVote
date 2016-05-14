export interface Poll {
    
    id: string;
    creatorName: string;    
    creatorId: string;
    creationDate: Date;
    title : string;
    question : string;
    options: Array<PollOption>;
    
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

export interface PollOption {
    
    name: string;
    value: number;
    
}