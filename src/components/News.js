import React, { Component } from 'react'

import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"



export class News extends Component {
  static defaultProps = {
    country:'us',
    pageSize:8,
    category:"science"
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,

  }
    constructor(){
    super();
    //console.log("hello i'm constructor from news components");
    this.state={
        articles:[],
        loading:true,
        page:1,
    }
     
   } 
   async updateNews(){
        this.props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        //console.log(parsedData);
        this.setState({
          articles:parsedData.articles,
          totalResults:parsedData.totalResults,
        })
        this.props.setProgress(100);
   }
   async componentDidMount(){
       this.updateNews(); 
       document.title = `${this.props.category} -NewsApp`;     
    }
   fetchMoreData = async () => {
    this.setState({page:this.state.page+1});
            const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        //console.log(parsedData);
        this.setState({
          articles:parsedData.articles,
          totalResults:parsedData.totalResults,
        })
    //this.updateNews()
  };
     handlePreClick= async ()=>{
       console.log("pre");
       this.setState({page:this.state.page-1});
       this.updateNews(); //function call
    }
     handleNextClick= async ()=>{
     this.setState({page:this.state.page+1});
     this.updateNews();//function call
    }
  render() {
    //console.log("render");
    return (
      <div>
        <h1 className='text-center' style={{margin:'35px 0px'}}>NewsApp -Top Headlines From {this.props.category} </h1>
        {/* {!this.state.loading && <Spinner/>} */}

        <InfiniteScroll
          dataLength={this.state.articles?.length || 0}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
       <div className="row">
        {this.state.articles.map((element)=>{
             return <div className="col-md-4"  key={element.url}>
        <NewsItems title={element.title||""} discription={element.description||""} imageurl={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
        </div>
        })
       }
       </div>
       </InfiniteScroll>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr;Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      
      </div>
      
    )
     
  }
}

export default News