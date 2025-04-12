const useRadix = (int: number) => {
  if (typeof int === "string") {
    int = Number.parseFloat(int);
  }
  // Split the input value into integer and decimal parts
  let [integerPart, decimalPart] = int.toFixed(2).split(".");
  // Format the integer part with commas for thousands separators
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const radixOutput = `${integerPart}.${decimalPart}`;

  return [radixOutput];
};

export default useRadix;
