import React from "react";
import Slider from "react-slick";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Container from "react-bootstrap/Container";
export default ({ data }) => (
  <Layout>
    <Container>
      <article
        className="sheet"
        style={{
          width: "100%",
          "background-color": "#f3f3f3",
          paddingLeft: "0px"
        }}
      >
        <HelmetDatoCms seo={data.datoCmsPost.seoMetaTags} />
        <div className="sheet__inner" style={{ width: "100%" }}>
          <h1 className="sheet__title">{data.datoCmsPost.title}</h1>
          <p className="sheet__lead">{data.datoCmsPost.excerpt}</p>
          <div className="sheet__slider">
            <Slider infinite={true} slidesToShow={2} arrows>
              {data.datoCmsPost.gallery.map(({ fluid }) => (
                <img
                  alt={data.datoCmsPost.title}
                  key={fluid.src}
                  src={fluid.src}
                />
              ))}
            </Slider>
          </div>
          <div
            className="sheet__body"
            dangerouslySetInnerHTML={{
              __html: data.datoCmsPost.descriptionNode.childMarkdownRemark.html
            }}
          />
          <div className="sheet__gallery">
            <Img fluid={data.datoCmsPost.coverImage.fluid} />
          </div>
        </div>
      </article>
    </Container>
  </Layout>
);

export const query = graphql`
  query PostQuery($slug: String!) {
    datoCmsPost(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
