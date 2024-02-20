import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-1.5 mx-2.5">
        <div className="card">
          <img
            src={imageUrl ? imageUrl : "https://i.ytimg.com/vi/nu-lColFPEk/maxresdefault.jpg"}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <div>
                <span
                className=" badge rounded-pill bg-danger"
                style={{display: "flex", justifyContent:"flex-end", position: "absolute", right: "0",top: "0",}}
              >
                {source}
              </span>
              </div>
              
            </h5>
            <p className="card-text">{description}</p>
            <div className="card-text">
              <small className="text-body-secondary" >
                By {author ? author : "Unknown"} on {new Date(date).toDateString()}
              </small>
            </div>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
