import Head from 'next/head'
import { Spacer } from '@geist-ui/react'
import projects from '../data.json'
import md from '@hackclub/markdown'
import Timeline from '../components/timeline'
import Site from '../components/site'

const ProjectPage = ({ project, prevSlug, nextSlug }) => (
  <>
    <Head>
      <title>{project.name} – 2020 Websites – @laclanjc</title>
    </Head>
    <style>{`
      body {
        background-color: ${project.color};
        color: ${project.color.includes('#f') ? '#222' : '#fff'};
      }
    `}</style>
    <Timeline />
    <Spacer y={1} />
    <Site {...project} prevSlug={prevSlug} nextSlug={nextSlug} standalone />
  </>
)

export default ProjectPage

export const getStaticPaths = () => {
  const paths = projects.map(p => p.slug).map(slug => ({ params: { slug } }))
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  const project = projects.find(p => p.slug === params.slug)
  project.desc = await md(project.desc)
  const i = projects.indexOf(project)
  const prevSlug = i > 0 ? projects[i - 1].slug : null
  const nextSlug = i < projects.length - 1 ? projects[i + 1].slug : null
  return { props: { project, prevSlug, nextSlug } }
}

/*
  {
    "month": "May",
    "slug": "hack-pennsylvania-finances",
    "name": "Hack Penn Finances",
    "desc": "On [Hack Club Bank](https://hackclub.com/bank/), we launched Transparency Mode, which allows you to open source your nonprofit’s finances the way you open source your code. To show off what you can do with it, I made a page showing all the finances for [Hack Pennsylvania](https://hackpenn.com). I also published [this blogpost](https://notebook.lachlanjc.com/2020-01-19_how_to_start_your_first_hackathon/) with a guide to starting a hackathon.",
    "color": "#1f5927",
    "url": "https://hackpenn.com/finances",
    "github": "https://github.com/hackpenn/site/blob/main/pages/finances.js"
  },
*/
