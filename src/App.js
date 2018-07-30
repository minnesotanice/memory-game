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
    arrayOfClicked: [],
    currentScore: 0,
    topScore: 0,
  };

  // RECORD MEMORY
  recordMemory = id => {
      // console.log("recordMemory this.state.currentScore is ", this.state.currentScore);

      // Shuffle images
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
      // Image order states
      this.setState({ memory:newOrder });


      // Detect duplicate image click
      const ArrayOfClicked = this.state.arrayOfClicked
      let duplicateBoolean = false
      ArrayOfClicked.map(function(singleID){
         
        if ( singleID === id ){
          duplicateBoolean = true
        } 
 
        return(duplicateBoolean);
       
      })


      // Scoring & Clicked Image Tracking
      let myScore = this.state.currentScore
      let myTopScore = this.state.topScore
      if ( duplicateBoolean === false) {
        // increase points
        myScore = myScore + 1
        this.setState({ currentScore: myScore })

        // check for new top score
        if ( myScore > myTopScore ) {
          this.setState({ topScore: myScore })
        }

        // Add ID of clicked image to array of clicked IDs
        ArrayOfClicked.push(id)  

      } else {
        // set points to 0
        myScore = 0
        this.setState({ currentScore: myScore })

        // empty array of clicked
        this.setState({ arrayOfClicked: [] })
      }
  };



  render() {
    // console.log("this is the state ", this.state);

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