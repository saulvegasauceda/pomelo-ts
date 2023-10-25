export function formatDollarAmount(amount: number): string {
    if (amount >= 0) {
      return `$${amount.toFixed(2)}`; // Fixed to 2 decimal places
    } else {
      const positiveAmount = Math.abs(amount);
      return `-$${positiveAmount.toFixed(2)}`;
    }
}

export function formatTimestamp(timestamp: number | null): string {
    if (timestamp === null) {
        return "-";
    }
    const date = new Date(Math.floor(timestamp) * 1000); // convert s to ms
    return date.toLocaleDateString('en-US');
}
