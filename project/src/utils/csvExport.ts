export function generateCSV(toolAnalysis: any[], selectedChecks: Record<string, string[]>) {
  // Create CSV header
  const headers = ['Tool Name', 'Supported Checks', 'Unsupported Checks'];
  let csvContent = headers.join(',') + '\n';

  // Add data for each tool
  toolAnalysis.forEach(tool => {
    const supportedChecks: string[] = [];
    const unsupportedChecks: string[] = [];

    Object.entries(tool.categoryScores).forEach(([category, scores]: [string, any]) => {
      scores.included.forEach((check: string) => {
        if (selectedChecks[category].includes(check)) {
          supportedChecks.push(`${category}: ${check}`);
        }
      });
      scores.notIncluded.forEach((check: string) => {
        if (selectedChecks[category].includes(check)) {
          unsupportedChecks.push(`${category}: ${check}`);
        }
      });
    });

    // Escape fields and wrap in quotes if they contain commas
    const row = [
      `"${tool.tool}"`,
      `"${supportedChecks.join('; ')}"`,
      `"${unsupportedChecks.join('; ')}"`
    ];

    csvContent += row.join(',') + '\n';
  });

  return csvContent;
}

export function downloadCSV(csvContent: string, filename: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    // Other browsers
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}