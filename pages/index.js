import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {
  Page,
  Text,
  Card,
  Spacer,
  User,
  Row,
  Col,
  Grid,
  Toggle
} from '@geist-ui/react'
import Video from '../components/mux'
import ProjectSite from '../components/site'
import md from '@hackclub/markdown'
import { reverse } from 'lodash'

const Header = () => (
  <Col component="header" className="header" justify="center" align="center">
    <Video mux="PPqmIRFuCQxjJk00M53yoBnNhj02HwaM6zzEhBndLbc300" />
    <Spacer y={2} />
    <User
      src="https://github.com/lachlanjc.png"
      name="2020 in Review"
      align="left"
    >
      <User.Link href="https://lachlanjc.com/">@lachlanjc</User.Link>
    </User>
    <Spacer y={1} />
    <Text
      h2
      h1
      style={{ fontSize: 'clamp(2rem, 1rem + 5vw, 4rem)', marginBottom: 0 }}
    >
      I make lots of websites.
    </Text>
    <Text style={{ opacity: 0.875 }} h3 h2>
      Here’s some of my favorites from 2020.
    </Text>
    <Spacer y={4} />
    <style jsx global>{`
      .header {
        position: relative;
        overflow: hidden;
        line-height: 1.125;
        min-height: 75vh;
      }
      .header * {
        z-index: 2;
        color: #fff !important;
        position: relative;
      }
      .header h1,
      .header h2 {
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25),
          0 2px 4px rgba(0, 0, 0, 0.25);
      }
      .header video {
        z-index: 0;
        position: absolute;
        top: -25%;
        left: 0;
        right: 0;
        bottom: 0;
      }
      .header .names {
        flex-direction: column-reverse !important;
        line-height: 1.5;
      }
    `}</style>
  </Col>
)

const Project = ({ slug, month, name, color, url }) => (
  <Grid xs={12} md={8} lg={6} style={{ scrollSnapAlign: 'start' }}>
    <Link href={`/${slug}`} passHref>
      <a>
        <Card hoverable style={{ overflow: 'hidden', lineHeight: 0 }}>
          <Card.Content style={{ lineHeight: 1.25 }}>
            <Text type="secondary" small>
              {month}
            </Text>
            <Text h4>{name}</Text>
          </Card.Content>
          <Image
            src={`/sites/${slug}.png`}
            width={2732}
            height={2048}
            alt={`Screenshot of ${name}`}
          />
        </Card>
      </a>
    </Link>
  </Grid>
)

const Index = ({ projects }) => {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <Head>
        <title>2020 Websites – @lachlanjc</title>
      </Head>
      <style jsx global>{`
        body {
          background-image: radial-gradient(#e3e3e3 1px, transparent 0),
            radial-gradient(#e3e3e3 1px, transparent 0);
          background-position: 0 0, 25px 25px;
          background-attachment: fixed;
          background-size: 50px 50px;
        }
      `}</style>
      <Header />
      <Col>
        <Spacer y={2} />
        <Row
          component="label"
          justify="center"
          style={{ alignItems: 'center' }}
        >
          <Toggle
            size="large"
            checked={expanded}
            onChange={e => setExpanded(e.target.checked)}
            style={{ padding: 0 }}
          />
          <Spacer x={0.75} />
          View inline
          <Spacer x={0.25} />
          <Text small type="secondary">
            (uses lots of data)
          </Text>
        </Row>
        <Spacer y={expanded ? 2 : 0.5} />
      </Col>
      {expanded ? (
        <Col component="main" style={{ scrollSnapType: 'y proximity' }}>
          {projects.map(project => (
            <ProjectSite key={project.slug} {...project} />
          ))}
        </Col>
      ) : (
        <Grid.Container
          gap={2}
          style={{ margin: '0 auto', scrollSnapType: 'y proximity' }}
        >
          {projects.map(project => (
            <Project key={project.slug} {...project} />
          ))}
        </Grid.Container>
      )}
      <Spacer y={3} />
      {/* <Page.Footer>
        <p>
          Site by <a href="https://lachlanjc.com">@lachlanjc</a>, 2020.{' '}
          <a href="https://github.com/lachlanjc/2020-sites">
            Open source on GitHub
          </a>
        </p>
      </Page.Footer> */}
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  let projects = require('../data.json')
  const descs = projects.map(p => p.desc)
  const html = await Promise.all(descs.map(d => md(d)))
  projects = projects.map((p, i) => {
    p.desc = html[i]
    return p
  })
  return { props: { projects } }
}
