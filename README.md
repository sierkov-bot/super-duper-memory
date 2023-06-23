## Overview
It's been a while(several years, ish) since I've wrote anything with React so most of the time I've spent reading docs in attempt to recall how things are done with React. High chance there are several or more anti-patterns but at least it works. Honestly there is not much to document:
- An app generated with create-next-app. In retrospect it was overkill as I wasn't using any of its' facilities. I'm used to Nuxt.js, coming from Vue, so I thought it'd make sense to use Next.js but no matter.
- Gave close to zero thought about file hierarchy and separation of concerns since the app is rather simple so I've put all the components into a single file and used functional ones to make it more simple and clear.
- If I was to start over I'd do many things differently. In addition, skipped some parts like loading placeholders and actual search button, the one for clearing input likewise.
- Chose pagination instead of infinite scroll as I hold strong belief that the latter will be remembered by history as one of the crimes against humanity.
- TailwindCSS because writing actual CSS is so 2012.
- Even though the app was generated for using TypeScript it's still JS, basically, so it lacks type declarations and other stuff. Going as far as disabling strict mode so it builds.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
