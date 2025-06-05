import React, { Component } from 'react'

export class NewsItems extends Component {
   

  render() {
    let {title,discription,imageurl,newsURL,author,date,source}=this.props;//destructing in js
    return (
      <div className='my-3'>
        <div className="card">
          <div style={
            {display:'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0px'}
            }>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"> {source}</span>
          </div>
          <img src={!imageurl?"https://images-prod.gothamist.com/images/Getty.2e16d0ba.fill-1200x650.format-webp.webpquality-85_TJWAHn4.webp":imageurl} className="card-img-top" alt="..."/>
          <div className="card-body">
               <h5 className="card-title">{title}</h5>
               <p className="card-text">{discription}</p>
               <p className="card-text text-primary"><small className='text-primary'>By{!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
               <a rel="noreferrer" href={newsURL} target="_blank" className="btn btn-sm btn-outline-dark">Read More</a>    
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItems
