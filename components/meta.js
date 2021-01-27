import Head from 'next/head'
import { useRouter } from 'next/router'

const makeTitle = (title, name) =>
  title === name ? title : `${title} – ${name}`

const Meta = ({
  title = '2020 Sites',
  name = '2020 Sites',
  description = 'Portfolio of 12 websites made by @lachlanjc throughout 2020.',
  image = 'https://2020-sites.vercel.app/card.jpg',
  url = 'https://2020-sites.lachlanjc.com',
  children
}) => {
  const { pathname } = useRouter()
  return (
    <Head>
      <meta key="og_locale" property="og:locale" content="en_US" />
      <meta key="og_type" property="og:type" content="website" />
      <meta key="og_site" property="og:site_name" content={name} />
      <meta key="og_url" property="og:url" content={`${url}${pathname}`} />
      <link key="canonical" rel="canonical" href={`${url}${pathname}`} />
      <title key="title">{makeTitle(title, name)}</title>
      <meta
        key="og_title"
        property="og:title"
        content={makeTitle(title, name)}
      />
      <meta
        key="tw_title"
        name="twitter:title"
        content={makeTitle(title, name)}
      />
      <meta key="desc" name="description" content={description} />
      <meta key="og_desc" property="og:description" content={description} />
      <meta key="tw_desc" name="twitter:description" content={description} />
      <meta key="og_img" property="og:image" content={image} />
      <meta
        key="og_img_alt"
        property="og:image:alt"
        content="Lachlan sitting at a desk coding, wearing red headphones, with the text 2020 Websites overlaid."
      />
      <meta key="og_img_width" property="og:image:width" content={1080} />
      <meta key="og_img_height" property="og:image:height" content={543} />
      <meta key="tw_card" name="twitter:card" content="summary_large_image" />
      <meta key="tw_img" name="twitter:image" content={image} />
      <meta key="theme_color" name="theme-color" content="#0070f3" />
      <link
        key="safari_icon"
        rel="mask-icon"
        href={`${url}/safari-pinned-tab.png`}
        color="#0070f3"
      />
      <link
        key="apple_icon"
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${url}/apple-touch-icon.png`}
      />
      <link
        key="favicon_32"
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${url}/favicon-32x32.png`}
      />
      <link
        key="favicon_16"
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${url}/favicon-16x16.png`}
      />
      {children}
    </Head>
  )
}

export default Meta
