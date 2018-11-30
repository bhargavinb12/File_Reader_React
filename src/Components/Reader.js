import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Header from './Header'


class Reader extends Component{
  constructor(props){
    super(props)
    this.state = {
      showHome: 'block',
      content:[],
      isLoaded:false,
      fileName:null,
      isText:false,
      categories: [],

      tabColor: 'black',
      tabBG:'white',
      font:12,

      TitleText:'block',
      TitleSet:'none',

     

  
    }
  }

  //NORMAL FUNCTIONS
  uploadFile = (files, rejectedFiles) => {
  
    const textFormat = document.getElementById('doc')
  
    if( textFormat.checked ===  false){     //checks whether the user has selected the radio button or not
      alert('Please checkbox doc filetype')
    }
 
    if (textFormat.checked ===  true  ){
     
      const reader = new FileReader()
      reader.onload = function(){
        document.getElementById('textarea').value = reader.result
        console.log(reader.result)
        //const val=reader.result;
        let val=reader.result;
      val = val.split(/\b\S+\b/g).length;  //regular expression to compute the number of words in a file
      console.log(val);
      if(!(val>=350)){   //if the number of words not greater than or equal to 350 words, pops an alert message
        alert('Please select a file which has more than 350 words')
        document.getElementById('textarea').value = ''  //textarea is reset to null if the wordcount is not greater than 350
        var millisecondsToWait = 1000;
        setTimeout(function() {
        alert('Please click on new file')
          }, millisecondsToWait);
        
      }
     

      }
     
        
      
      reader.readAsText(files[0])
      this.setState({isText:true})
      this.setState({fileName:files[0].name})
    }
  }
  newFile = () => {
   
    this.setState({isText:false})
    this.setState({content:[]})
  }


  

  //TEXTINPUT FUNCTIONS
 
  clearDoc = () => {
    
    document.getElementById('textarea').value = ''
    this.setState({fileName:''})
  }
 

  reverse = () => {
    const paragraph = document.getElementById('textarea').value
    const new_paragraph = paragraph.split("").reverse().join("").split(" ").reverse().join(" ")  //regular expression to reverse words but maintain them in order
    document.getElementById('textarea').value = new_paragraph
  }

  

  sort = () => {
   const paragraph = document.getElementById('textarea').value
   const new_paragraph = paragraph.replace(/\s+/g, " ").replace(/^\s|\s$/g, "") //regexp to strip all whitespace amd special character
   const para2 = new_paragraph.replace(/\s+/g, '')
   const para3 = para2.split('').sort().join('')  //sort function to sort the text in alphabetical order
   document.getElementById('textarea').value = para3
  }

  findwords = () => {
  const paragraph = document.getElementById('textarea').value
  const currentWord = document.getElementById('findword').value
  console.log(currentWord)
const regex = new RegExp('\\b' + currentWord + '\\b', 'g'); //regexp constructor to dynamically take a value from user input
const matches = paragraph.match(regex)
const count = matches ? matches.length : 0  //if the word is present in the text file, it stores the value in count
console.log(count)
 document.getElementById('findword').value = count //count value is displayed in the input-text box where we enter a word to search
  
}
  
 
  render(){
    var { isLoaded,   isText} = this.state
    if(!isLoaded  && !isText){
      return(
        <div>
          <div>
            <Header/>
          </div>
          <div id='dropzone' style={{display:this.state.showHome}}>
            <div id='dropper'>
              <Dropzone onDrop={this.uploadFile} maxSize={5000000}>Upload File</Dropzone>
            </div>
            <div id='fileSec'>
              <h3>File Type</h3>
           
              Text File <input type='radio' id='doc' name='fileType' class='radio'/>
            </div>
          </div>
        </div>
      )
    }
  
    else if(isText){
      return(
        <div>
          <div>
            <Header/>
          </div>
          <div id='palleteBox'>
            <button onClick={this.newFile} class='opt' style={{marginLeft:10}}>New File</button><br/><br/>
            <button onClick={this.clearDoc} class='opt' style={{marginLeft:10}}>Clear Doc</button><br/><br/>
            <button onClick={this.reverse} class='opt' style={{marginLeft:10}}>Reverse text</button><br/><br/>
            <button onClick={this.sort} class='opt' style={{marginLeft:10}}>Sort text</button><br/><br/>
        
           
            <hr/>
        

          <label style={{marginLeft:10}}>Word count <input type='text' id='findword' size={15}/></label><br/><br/>
           
            <button class='opt' onClick={this.findwords} style={{marginRight:15, marginLeft:10}}>Go</button><br/>
            <hr/>
            
          
            
          </div>
          <div id='textSection'>
          
            <h1 style={{color:'white', display:this.state.TitleText}}>{this.state.fileName}</h1>
            <hr/>
            
            <textarea id='textarea' rows={44} cols={80} style={{fontSize:this.state.font, backgroundColor:this.state.tabBG, color:this.state.tabColour}}/>
          </div>
        </div>
      )
    }
  }
}

export default Reader
