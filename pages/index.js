import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {
  Page,
  Text,
  Card,
  Spacer,
  Badge,
  User,
  Row,
  Col,
  Grid,
  Toggle
} from '@geist-ui/react'
import ProjectSite from '../components/site'
import md from '@hackclub/markdown'

const Project = ({ slug, month, name, color, url }) => (
  <Grid
    xs={24}
    md={12}
    lg={6}
    style={{ scrollSnapAlign: 'start' }}
  >
    <Link href={`/${slug}`} passHref>
      <a >
        <Card hoverable style={{ overflow: 'hidden', lineHeight: 0 }}>
          <Card.Content style={{ lineHeight: 1.25 }}>
            <Text type="secondary" small>
              {month}
            </Text>
            <Text h4>
              {name}
            </Text>
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
        header .names {
          flex-direction: column-reverse !important;
          line-height: 1.5;
        }
      `}</style>
      <Col component="header" justify="center" align="center" style={{ lineHeight: 1.125 }}>
        <Spacer y={2} />
        <User
          src="https://github.com/lachlanjc.png"
          name="2020 in Review"
          align="left"
        >
          <User.Link href="https://lachlanjc.com/">@lachlanjc</User.Link>
        </User>
        <Spacer y={1} />
        <Text h2 h1 style={{ marginBottom: 0 }}>
          I make lots of websites.
        </Text>
        <Text type="secondary" h3 h2>
          Here’s some of my favorites from 2020.
        </Text>
        <Row component="label" justify="center" style={{ alignItems: 'center' }}>
          <Toggle
            size="large"
            checked={expanded}
            onChange={e => setExpanded(e.target.checked)}
            style={{ padding: 0 }}
          />
          <Spacer x={0.75} />
          View them inline
          <Spacer x={0.25} />
          <Text small type="secondary">(uses lots of data)</Text>
        </Row>
        <Spacer y={3} />
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
            className="list"
            style={{ padding: 'calc(2 * var(--gaid-gap-unit))', margin: '0 auto', scrollSnapType: 'y proximity' }}
          >
            {projects.map(project => (
              <Project key={project.slug} {...project} />
            ))}
          </Grid.Container>
        )}
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
