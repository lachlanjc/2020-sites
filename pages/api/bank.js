export default async (req, res) =>
  fetch('https://bank.hackclub.com/hackpenn')
    .then(r => r.text())
    .then(t => res.send(t.replace('<head>', '<head><meta charset="UTF-8">')))
