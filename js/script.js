
const parseTextToFarmProductLines = (text) => {
    const re = /\w[\w ]+\s*-\s*[(\w+), ]+/;
    const lines = text.split('\n');
    const matchedPatterns = lines
        .flatMap(e => re.exec(e))
        .filter((e) => e !== null);
    return matchedPatterns;
};

const parseLineIntoProducts = (line) => {
    const tokens = line.split("-").join().trim().split(',');
    const farmName = tokens[0].trim();
    const products = tokens.slice(1).flatMap(s => s.trim());
    return [farmName, products];
};

const removeDuplicates = (arr) => {
    return [...new Set(arr)];
};

const updateFarms = (farmsAndProducts) => {
    const farmNames = farmsAndProducts.flatMap(e => e[0]);
    console.log(farmNames);
    $("#resulting-farms").text(farmNames.join(', '));
}

const updateProducts = (farmsAndProducts) => {
    const products = farmsAndProducts.flatMap(e => e[1]).filter(t => t !== "");
    const uniqueProducts = removeDuplicates(products);
    console.log(uniqueProducts.join(', '));
    $("#resulting-products").text(uniqueProducts.join(', '));
};

$("#email-body").on('input', (e) => {
    const text = $("#email-body").val();
    const lines = parseTextToFarmProductLines(text);
    const farmNamesAndProducts = lines.map(l => parseLineIntoProducts(l));
    updateFarms(farmNamesAndProducts);
    updateProducts(farmNamesAndProducts);
});
