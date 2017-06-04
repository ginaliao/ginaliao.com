---
title: Milford Centre
url: http://milfordcentre.co.nz
year: 2017
image:
  thumbnail:
    small: milford-centre-thumbnail-small.jpg
    large: milford-centre-thumbnail-large.jpg
responsibilities:
  - front-end development
  - WordPress development
---

The Milford Centre was one of the first of NZRPG's shopping centres to get a make-over and would become the precedent for proceeding websites.

Each store has its own centralised page for editing, meaning edits propagate to its single listing page, the directory page and centre map. This is achievable through the integration of the WP REST API, Advanced Custom Fields Pro and Mapplic plugin. Opening hours are set for each individual store, with the ability to add irregular store hours such as public holidays; the appropriate messaging is then dynamically calculated based on the time of day. Featured content blocks can be set by simply selecting an existing post or page and the content is automatically pulled and displayed.

Subsequent shopping centre websites under the NZRPG umbrella utilise parent-child themes, where the majority of edits can be made to the parent theme and will propagate to the child themes. Individual settings have been extracted as follows to allow for ease of maintenance:

* All Sass files reference the parent theme with a settings partial for changing colours/fonts
* The JS is compiled with Webpack, with a settings layer in JSON
* Parent functions and template files can be overridden by the child theme