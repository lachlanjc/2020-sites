import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Text, Card, Spacer, Row, Col, Grid, Toggle } from '@geist-ui/react'

import Meta from '../components/meta'
import Video from '../components/mux'
import Author from '../components/author'
import ProjectSite from '../components/site'
import projects from '../data.json'

const Header = () => (
  <Col component="header" className="header" justify="center" align="center">
    <Video
      mux="PPqmIRFuCQxjJk00M53yoBnNhj02HwaM6zzEhBndLbc300"
      aria-label="Time lapse of Lachlan coding a website, filmed from behind the desk"
    />
    <Spacer y={2} />
    <Author />
    <Spacer y={1} />
    <Text h1 style={{ fontSize: 'clamp(1.5rem, 1rem + 8vw, 4rem)' }}>
      I make lots of websites.
    </Text>
    <Text
      h2
      style={{ fontSize: 'clamp(1rem, 1rem + 4vw, 2rem)', opacity: 0.875 }}
    >
      Here’s some of my favorites from 2020.
    </Text>
    <Spacer y={4} />
    <style jsx global>{`
      .header {
        position: relative;
        overflow: hidden;
        line-height: 1.125;
        min-height: 384px;
        height: 75vh;
        max-height: 768px;
      }
      .header * {
        z-index: 2;
        color: #fff !important;
        position: relative;
      }
      .header h1,
      .header h2 {
        line-height: 1.125;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25),
          0 2px 4px rgba(0, 0, 0, 0.25);
      }
      .header video {
        z-index: 0;
        position: absolute;
        object-fit: cover;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .header video::-webkit-media-controls {
        display: none !important;
      }
    `}</style>
  </Col>
)

const Project = ({ slug, month, name }) => (
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
            sizes="25vw"
          />
        </Card>
      </a>
    </Link>
  </Grid>
)

const Index = () => {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()

  useEffect(
    () => {
      if (router.pathname === '/' && expanded) {
        router.replace('/[slug]', `/${projects[0].slug}`)
      }
    },
    [expanded]
  )

  return (
    <>
      <Meta />
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
        <Spacer y={1.5} />
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
          View in series
        </Row>
        <Spacer y={1} />
      </Col>
      {expanded ? (
        <ProjectSite {...projects[0]} />
      ) : (
        <Grid.Container
          gap={1}
          style={{
            margin: '0 auto',
            padding: '0 6pt',
            maxWidth: '100%',
            scrollSnapType: 'y proximity'
          }}
        >
          {projects.map(project => (
            <Project key={project.slug} {...project} />
          ))}
        </Grid.Container>
      )}
      <Spacer y={1.5} />
      <Text
        type="secondary"
        align="center"
        style={{ maxWidth: '28ch', margin: 'auto' }}
      >
        Video by <Link href="https://maxwofford.com">@msw</Link> of me building
        the{' '}
        <Link href="https://hackclub.com/bank/">Hack&nbsp;Club Bank site</Link>,
        March 2019.
      </Text>
      <Spacer y={1} />
      <Author github />
      <Spacer y={2} />
    </>
  )
}

export default Index
