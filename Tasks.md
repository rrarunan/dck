***Test a JavaScript function using PureScript and QuickCheck. Explain what you chose to test and why.***

  - I chose the `GCD` problem.
  - There were atleast 3 different recursive solutions.
  - Since I was learning `purescript` and `quickcheck` for the first time; wanted to practise writing recursive solutions in purescript.
  - Also, the test cases were simple checks of two parameters being passed into the function.
  - Started with `Euclid's Algorithm` and added some `Math.abs` to support negative integers.
  - For input `zero`, it was interesting to note that there were long discussions on the `Math` section of stack overflow.

----

***Create a React Component in a CommonJS module. Explain how you thought about the creation of the component.***

  - A component to show a list of running containers in the browser.
  - Uses `docker ps` commands to the docker daemon and pulls status and details of containers managed by the daemon.
  - The `server` part mocks an actual docker daemon running and pushes generated data randomly to the `browser` component written in `ReactJS` using `CommonJS` modules.
  - Implemented it using `reactJS` in mostly JSX files and grunt tasks to compile to JS.
  - A `DaemonService` written in NodeJS runs in the background collecting information from the docker daemon every 30 seconds using a simple short polling mechanism

----

***Build a project with a dockerfile. Put the container on the Hub so we can pull and run it.***

  - Built a project that can run the above two projects.
  - Dependencies:
  		`docker.io`
  		`ghc (Haskell Platform)`
  		`git`
  		`nodejs`
  		`npm`
----

***What piece of tech (programming language, framework, paper, etc) excites you the most right now? Why?***

- d3.js
- The framework provides a low level hook into SVG files to come up with interesting visualizations
- A big community of followers and examples have shown that really interesting problems can be implemented as plugins: `force-directed graphs`, `voronoi diagrams` etc.
- It is exciting personally for me to think about visualizing information and implementing other graphics/animation related algorithms like `Craig Reynold's Boids` etc.
