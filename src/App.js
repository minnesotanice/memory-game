import React, { Component } from "react";
import MemoryCard from "./components/MemoryCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import memory from "./memory.json";
import "./App.css";

class App extends Component {
  // Setting this.state.memory to the memory json array
  state = {
    memory: memory,
    justClicked: "",
    arrayOfClicked: [],
    duplicateGuess: false,
    currentScore: 0,
    topScore: 0,
  };

  // RECORD MEMORY
  recordMemory = id => {
      console.log("we are clicked");
      console.log(this.state.currentScore);

      // function for shuffling images
      const oldOrder = this.state.memory
      const newOrder = shuffle(oldOrder)
      function shuffle(imageOrder) {
        var j, x, i;
        for (i = imageOrder.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = imageOrder[i];
          imageOrder[i] = imageOrder[j];
          imageOrder[j] = x;
        }
        return imageOrder;
      }

      // Detect duplicate guess
      const newList = this.state.arrayOfClicked
      const self = this
      newList.map(function(singleID){
        console.log(singleID);
        if ( singleID === id ){
          console.log("you lose!");
          self.setState({ duplicateGuess:true });
        }
        // return( this.push(id) )
      })
      newList.push(id)  


    // Set current score
    if (this.state.duplicateGuess === true) {
      console.log("duplicate guess");
      this.setState( { currentScore: 0 } )
    } else {
      console.log("NOT duplicate guess");
      this.setState( { currentScore: this.state.currentScore + 1 } )
          // Set top score
        if ( this.state.currentScore === this.state.topScore) {
          this.setState({ topScore: this.state.currentScore + 1 })
      }
    }

    // Set new order for display of images and update array of clicked image IDs
    this.setState({ memory:newOrder, arrayOfClicked:newList });
  };


  // Map over this.state.memory and render a MemoryCard component for each friend object
  render() {
    console.log("this is the state ", this.state);

      return ( 
        <Wrapper>
          <Title>
              The North Remembers, Do You?

          </Title> 

          <div className="container">
              <div className="row">
                  <div className="col-6 text-right">
                      Current Score: {this.state.currentScore} 
                  </div>
                  <div className="col-6 text-left">
                      Top Score: {this.state.topScore}
                  </div>
              </div>
          </div>

          <div className="container">
              <div className="row d-flex justify-content-around">
                  {this.state.memory.map(memory => ( 
                    <MemoryCard
                    recordMemory = {
                        this.recordMemory
                      }
                      id = {
                        memory.id
                      }
                      key = {
                        memory.id
                      }
                      name = {
                        memory.name
                      }
                      image = {
                        memory.image
                      }
                      />
                    ))
                  } 
                </div>   
            </div>
          </Wrapper>
    
        )
;
  }
}

export default App;