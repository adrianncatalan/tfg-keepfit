//Función para calcular el imc -Altura esta dividio entre 100 para que nos arroje un decimal
const bmiCal = (weight, height) => (weight / (Math.pow((height / 100), 2)));

//Función para calcular el bone weight -Altura esta dividio entre 100 para que nos arroje un decimal
const boneWeightCal = (weight) => weight * 0.15;

// (3.02 * ((Math.pow((Math.pow((height/100), 2)) * (wristDiameter * femurDiameter)) * 400), 0.712));

// 3.02 * (Math.pow(height / 100), 2) * (Math.pow(wristDiameter * femurDiameter * 400),0.712);

//Función para calcular el muscle weight
const muscleWeightCal = (weight, fatWeight, boneWeight, residualWeight) => (weight - fatWeight - boneWeight - residualWeight);

//Función para el residual weight hombres
const residualWeightMenCal = (weight) => ((weight * 24.1) / 100);

//Función para el residual weight mujeres
const residualWeightWomenCal = (weight) => ((weight * 20.9) / 100);

//Función para el fatweight
const fatWeightCal = (weight, fatPercentage) => (weight / fatPercentage);

//Función para el fat percentage hombres
const fatPercentageMenCal = (bmi, age) => ((1.2 * bmi) + (0.23 * age) - (10.8 * 1) - 5.4);

//Función para el fat percentage mujeres
const fatPercentageWomenCal = (bmi, age) => ((1.2 * bmi) + (0.23 * age) - 5.4);

module.exports = {
    bmiCal,
    boneWeightCal,
    muscleWeightCal,
    residualWeightMenCal,
    residualWeightWomenCal,
    fatWeightCal,
    fatPercentageMenCal,
    fatPercentageWomenCal,
}
