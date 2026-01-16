export function compareWithLastMonth(
  current: number,
  previous?: number
) {
  if (previous == null) {
    return {
      text: 'No data for last month',
      icon: 'remove',
      color: '#9e9e9e',
    };
  }

  const diff = current - previous;
  const percent =
    previous === 0 ? 0 : Math.abs((diff / previous) * 100).toFixed(1);
  if (diff > 0) {
    return {
      text: `Increased by ${percent}% compared to last month`,
      icon: 'arrow_upward',
      color: '#198754',
    };
  }

  if (diff < 0) {
    return {
      text: `Decreased by ${percent}% compared to last month`,
      icon: 'arrow_downward',
      color: '#dc3545',
    };
  }

  return {
    text: 'No change compared to last month',
    icon: 'remove',
    color: '#6c757d',
  };
}
