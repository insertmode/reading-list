# Reading List
A `Reading List` is a list of `Resources` plus oprionally a list of `Annotations`.

## Resources
A `Resource` consists of
  - a `title`
  - an `entry` point (absolute URL)
  - a `description` (in markdown syntax)
  - (optional) a list of `pages`, where a page
    - can either have a `URL` or `regex` that can be used to check whether the browser is currently on that page
    - can be used to show reading progress within a resource

## Annotations

An `Annotation` has
  - one or more `regex`
  - a title
  - a body (in markdown syntax)
  - (optionally) a CSS selector, selecting the element it will be `attachedTo`

When the browser is at a url that matches one of the `Annotation`'s `regex`, it will display title and body on top of the page.


