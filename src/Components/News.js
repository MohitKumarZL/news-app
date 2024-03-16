import React, { Component } from "react";
import NewsItem from "./NewsItem";
// import Spinner from "../Spinner";
import PropTypes from "prop-types";
// import InfiniteScroll from "react-infinite-scroll-component";

import json from "../articles.json"

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    this.state = {
      articles: json.articles,
      loading: false,
      page: 1,
      totalResults: 0,
      
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} ZL News`
  }
  async updatedNews(){
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);

    if (!parsedData.articles) return;
    
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: true,
    });
    this.props.setProgress(100);
  }

  // async componentDidMount() {
  //   this.updatedNews();
  // }

  handlePreviousClick = async () => {
    this.setState({page:this.state.page -1})
    this.updatedNews();
  };
  handleNextClick = async () => {
    this.setState({page:this.state.page +1})
    this.updatedNews();
  };

  fetchMoreData = async () => {
    this.setState({page:this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      
    });
    
  };

  render() {
    return (
      <div>
        <h2 className="my-3"style={{textAlign:"center"}}> Top Headlines on {this.capitalizeFirstLetter(this.props.category)} </h2>
        
        {/* <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        > */}
        <div className="container my-3">
          <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-3" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 15) : ""}
                  description={element.description ? element.description.slice(0, 50) : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
          </div>
        </div>
        {/* </InfiniteScroll> */}
      </div>
    );
  }
}

export default News;
