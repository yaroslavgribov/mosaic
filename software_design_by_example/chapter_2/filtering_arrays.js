const people = [
	{ personal: "Jean", family: "Jennings" },
	{ personal: "Marly", family: "Wescoff" },
	{ personal: "Ruth", family: "Lichterman" },
	{ personal: "Bett", family: "Snyder" },
	{ personal: "Frances", family: "Bilas" },
	{ personal: "Ka", family: "McNulty" },
];

const result = people.filter(({ personal, family }) => personal[0] >= family[0])

console.log(result)
