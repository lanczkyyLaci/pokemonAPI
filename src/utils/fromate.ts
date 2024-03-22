// Helper Functions for Name Formatting

/**
 * //FUNCTION-DESCRIPTION: Gets the first character of the name and converts it to uppercase, used for Avatar content.
 *
 * @param {string} name The input name.
 * @returns {string} The uppercase first character of the name.
 */
export const getAvatarContent = (name: string) => {
	// Get the first character of the name and convert it to uppercase[]
	return name.charAt(0).toUpperCase();
};

/**
 * //FUNCTION-DESCRIPTION: Formats the name to start with an uppercase letter.
 *
 * @param {string} name The input name.
 * @returns {string} The name with the first letter capitalized.
 */
export const capitalizeFirstLetter = (name: string): string => {
	return name.charAt(0).toUpperCase() + name.slice(1);
};

/**
 * //FUNCTION-DESCRIPTION: Converts height from decimeters to centimeters.
 *
 * @param {number} heightInDecimeter The height in decimeters.
 * @returns {number} The height converted to centimeters.
 */
export const decimeterToCentimeter = (heightInDecimeter: number) => {
	return heightInDecimeter * 10; // 1 decimeter = 10 centimeter
};

/**
 * //FUNCTION-DESCRIPTION: Converts weight from hectograms to kilograms.
 *
 * @param {number} weightInHectogram The weight in hectograms.
 * @returns {number} The weight converted to kilograms.
 */
export const hectogramToKilogram = (weightInHectogram: number) => {
	return weightInHectogram / 10; // 1 hektogram = 0.1 kilogram
};
