function getScoreTone(score) {
  if (score >= 8) return 'good';
  if (score >= 5) return 'warning';
  return 'critical';
}

module.exports = getScoreTone;