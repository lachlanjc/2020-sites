import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Card, Spacer, Col, Row, Text } from '@geist-ui/react'
import projects from '../data.json'

const Timeline = () => {
  const router = useRouter()

  return (
    <Row
      component="nav"
      gap={1}
      justify="center"
      style={{ paddingTop: '12pt', margin: 0, overflowX: 'auto' }}
    >
      {projects.map(project => (
        <Link key={project.slug} passHref href={`/${project.slug}`}>
          <Col
            component="a"
            align="center"
            justify="center"
            className={project.slug === router.query.slug ? 'active' : ''}
          >
            <Image
              src={`/sites/${project.slug}.png`}
              width={2732 / 8}
              height={2048 / 8}
              alt={`Screenshot of ${project.name}`}
            />
            <Text b={project.slug === router.query.slug} small>
              {project.month}
            </Text>
          </Col>
        </Link>
      ))}
      <style jsx>{`
        :global(nav a) {
          color: inherit;
          min-width: 72px;
          max-width: 128px;
          text-align: center;
          line-height: 1.25;
        }
        :global(nav a.active) {
          filter: drop-shadow(0 0 5px white);
        }
        :global(nav a img) {
          border-radius: 5px;
        }
      `}</style>
    </Row>
  )
}

export default Timeline
