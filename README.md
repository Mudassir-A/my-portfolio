# Mudassir Ansari · Portfolio (Next.js)

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
```

## Production
```bash
npm run build
npm start
```
Or push to GitHub and import the repo on Vercel (zero config).

## Edit your content
Everything (projects, education, experience, email, social links, skills) lives in `lib/data.js`.
Replace the placeholder projects, `hello@example.com` and the social URLs with your real ones.

## Neural network (components/NeuralNet.jsx)
- Hover: fires from the input layer to the output layer.
- Click a node: fires forward from that node.
- Nodes and edges are pushed away from the mouse while hovering.
- Layer sizes: change `LAYERS` at the top of the file.
