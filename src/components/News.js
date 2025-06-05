import React, { useEffect,useState } from 'react'

import NewsItems from './NewsItems'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


export default function News(props){
// const News =(props)=>
//   {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  document.title=`${(props.category)} - NewsApp`

  //  } 
  const updateNews = async()=>{
        props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data=await fetch(url);
        let parsedData=await data.json();
        //console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
   }
   useEffect(() =>{
      updateNews(); 
  },[])
 
   const fetchMoreData = async () => {
        setPage(page+1)
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data=await fetch(url);
        let parsedData=await data.json();
        //console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        //updateNews()
    };
    const handlePreClick= async ()=>{
      //  console.log("pre");
       setPage(page-1)
       updateNews(); //function call
    }
     const handleNextClick= async ()=>{
      //console.log("next");
     setPage(page+1)
     updateNews();//function call
    }
  
    
    return (
      <div>
        <h1 className='text-center' style={{margin:'35px 0px'}}>NewsApp -Top Headlines From {props.category} </h1>
        {/* {!loading && <Spinner/>} */}

        <InfiniteScroll
          dataLength={articles?.length || 0}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
       <div className="row">
        {articles.map((element)=>{
             return <div className="col-md-4"  key={element.url}>
        <NewsItems title={element.title||""} discription={element.description||""} imageurl={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
        </div>
        })
       }
       </div>
       </InfiniteScroll>
        <div className="container d-flex justify-content-between">
            <button disabled={page<=1} type="button" className="btn btn-dark" onClick={handlePreClick}>&larr;Previous</button>
            <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)}type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div>
      
      </div>
      
    )
     
};

 News.defaultProps = {
    country:'us',
    pageSize:8,
    category:"science"
  };
  News.propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,

  };

//export default News