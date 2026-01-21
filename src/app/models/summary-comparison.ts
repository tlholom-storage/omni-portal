export function compareWithLastMonth(current: number, previous?: number) {
  if (previous == null) {
    return {
      text: 'No data for last month',
      icon: 'remove',
      color: '#9e9e9e',
    };
  }

  if (previous === 0 && current > 0) {
    return {
      text: 'Started from zero last month',
      icon: 'arrow_upward',
      color: '#198754',
    };
  }

  const diff = current - previous;

  if (diff === 0) {
    return {
      text: 'No change compared to last month',
      icon: 'remove',
      color: '#6c757d',
    };
  }

  const percent = Math.abs((diff / previous) * 100).toFixed(1);

  if (diff > 0) {
    return {
      text: `Increased by ${percent}% compared to last month`,
      icon: 'arrow_upward',
      color: '#198754',
    };
  }

  return {
    text: `Decreased by ${percent}% compared to last month`,
    icon: 'arrow_downward',
    color: '#dc3545',
  };
}
