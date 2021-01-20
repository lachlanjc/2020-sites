module.exports = {
  async headers() {
    return [
      {
        source: '/api/bank',
        headers: [
          {
            key: 'cache-control',
            value: 's-maxage=3600'
          }
        ]
      }
    ]
  }
}
