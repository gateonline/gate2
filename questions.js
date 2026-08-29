const questions = [

    // =========================================================
    // Q1 - 1 MARK - MCQ
    // =========================================================

    {
        question: "Glyptal, an alkyd resin, is synthesized by reacting phthalic anhydride with glycerol. What are the respective functionalities of phthalic anhydride and glycerol?",

        options: [
            "1, 3",
            "2, 3",
            "1, 2",
            "2, 2"
        ],

        answer: 1,
        type: "MCQ",
        marks: 1
    },


    // =========================================================
    // Q2 - 1 MARK - MCQ
    // =========================================================

    {
        question: "What is the functionality of 1,4-divinylbenzene when it undergoes addition reactions across its carbon-carbon double bonds?",

        options: [
            "1",
            "2",
            "3",
            "4"
        ],

        answer: 3,
        type: "MCQ",
        marks: 1
    },


    // =========================================================
    // Q3 - 1 MARK - MCQ
    // =========================================================

    {
        question: "During the step-growth polymerization of phenol with formaldehyde, what is the functionality of phenol?",

        options: [
            "2",
            "3",
            "4",
            "5"
        ],

        answer: 1,
        type: "MCQ",
        marks: 1
    },


    // =========================================================
    // Q4 - 1 MARK - MCQ
    // =========================================================

    {
        question: "Which one of the monomers given is used in the synthesis of cellulose? (G-23)",

        options: [
            "Fructose",
            "Lactic acid",
            "Galactose",
            "Glucose"
        ],

        answer: 3,
        type: "MCQ",
        marks: 1
    },


    // =========================================================
    // Q5 - 1 MARK - MCQ
    // =========================================================

    {
        question: "A polymer scientist isolates a polymer from a plant source. Hydrolysis of the polymer yields only glucose molecules. The polymer is most likely:",

        options: [
            "Polycarbonate",
            "Cellulose",
            "Nylon-6",
            "Polypropylene"
        ],

        answer: 1,
        type: "MCQ",
        marks: 1
    },


    // =========================================================
    // Q6 - 1 MARK - MCQ
    // =========================================================

    {
        question: "A researcher wants to prepare a polymer that can be enzymatically degraded in the human body. Which monomer would be the most suitable starting material?",

        options: [
            "Vinyl chloride",
            "Styrene",
            "Lactic acid",
            "Ethylene"
        ],

        answer: 2,
        type: "MCQ",
        marks: 1
    },


    // =========================================================
    // Q7 - 1 MARK - MCQ
    // =========================================================

    {
        question: "Among the options given, identify the correct match between the polymers and their glass transition temperatures (Tg). (G-23)\n\nP. High density polyethylene\nQ. Poly(vinyl carbazole)\nR. Polymethyl methacrylate\nS. Polycarbonate\n\n1. >200 °C\n2. 145 to 155 °C\n3. -100 to -80 °C\n4. 90 to 100 °C",

        options: [
            "P-2; Q-4; R-3; S-1",
            "P-3; Q-1; R-4; S-2",
            "P-3; Q-4; R-1; S-2",
            "P-4; Q-2; R-1; S-3"
        ],

        answer: 1,
        type: "MCQ",
        marks: 1
    },


    // =========================================================
    // Q8 - 1 MARK - NAT
    // =========================================================

    {
        question: "In a stoichiometric polycondensation of a diol and a diacid, the number-average degree of polymerization required is X̄n = 50. The percent conversion (p) of functional groups needed, in %, is ________. Round to one decimal place.",

        answer: 98.0,
        type: "NAT",
        marks: 1
    },


    // =========================================================
    // Q9 - 1 MARK - MCQ
    // =========================================================

    {
        question: "Glycerol reacted with a large excess of acetic acid (monofunctional) will produce:",

        options: [
            "A crosslinked network polymer, since glycerol is trifunctional",
            "A linear polyester of high molecular weight",
            "Only low-molecular-weight ester (no polymer), since chain growth is terminated by the monofunctional acid",
            "A hyperbranched polymer"
        ],

        answer: 2,
        type: "MCQ",
        marks: 1
    },


    // =========================================================
    // Q10 - 1 MARK - NAT
    // =========================================================

    {
        question: "In a free-radical polymerization, doubling the initiator concentration (all else constant) changes the polymerization rate Rp by a factor of ________. Round to two decimal places, given Rp ∝ [M][I]^½.",

        answer: 1.41,
        type: "NAT",
        marks: 1
    },


    // =========================================================
    // Q11 - 2 MARKS - MCQ
    // =========================================================

    {
        question: "A monomer mixture contains 3 mol of a diol, 2 mol of a diacid, and 1 mol of a triacid. The average functionality (f_avg) of the system, considering all molecules, is:",

        options: [
            "2.00",
            "2.17",
            "2.50",
            "3.00"
        ],

        answer: 1,
        type: "MCQ",
        marks: 2
    },


    // =========================================================
    // Q12 - 1 MARK - MCQ
    // =========================================================

    {
        question: "α-Methylstyrene has a low ceiling temperature (~61 °C). Attempting free-radical polymerization of pure α-methylstyrene at 80 °C will result in:",

        options: [
            "Very high molecular weight polymer, since rate increases with temperature",
            "No significant polymer formation, since depropagation outpaces propagation above Tc",
            "Crosslinked polymer due to thermal branching",
            "Alternating copolymer with itself"
        ],

        answer: 1,
        type: "MCQ",
        marks: 1
    },


    // =========================================================
    // Q13 - 1 MARK - NAT
    // =========================================================

    {
        question: "Monomers A and B are copolymerized with r_A = 4.0 and r_B = 0.25 from an equimolar feed (f_A = f_B = 0.5). Using the Mayo–Lewis equation, the instantaneous mole fraction of A in the copolymer, F_A, is ________. Round to two decimal places.",

        answer: 0.80,
        type: "NAT",
        marks: 1
    },


    // =========================================================
    // Q14 - 1 MARK - MSQ
    // =========================================================

    {
        question: "In a free-radical polymerization, a chain transfer agent (e.g., a mercaptan) is added. Which statements are CORRECT?",

        options: [
            "The overall rate of polymerization Rp remains essentially unchanged if the new radical reinitiates efficiently",
            "The number-average degree of polymerization decreases",
            "Chain transfer to polymer leads to branching, as in LDPE",
            "The Mayo equation relates 1/X̄n to the ratio [S]/[M] with slope equal to the chain transfer constant Cs"
        ],

        answer: [0, 1, 2, 3],
        type: "MSQ",
        marks: 1
    },


    // =========================================================
    // Q15 - 1 MARK - MCQ
    // =========================================================

    {
        question: "Poly(ethylene terephthalate) is NOT rubbery at room temperature, while natural rubber is. Which combination of reasons is correct?",

        options: [
            "PET: Tg above room temperature and crystallizability; NR: Tg far below room temperature, amorphous in unstrained state, crosslinkable",
            "PET: too low molecular weight; NR: too high molecular weight",
            "PET: absence of polar groups; NR: presence of polar groups",
            "PET: flexible backbone; NR: rigid backbone"
        ],

        answer: 0,
        type: "MCQ",
        marks: 1
    },


    // =========================================================
    // Q16 - 1 MARK - NAT
    // =========================================================

    {
        question: "A polypropylene sample has specific volume 1.10 cm³/g. Given specific volumes: amorphous = 1.18 cm³/g and crystalline = 1.06 cm³/g, the mass-fraction crystallinity in %, is ________. Round to the nearest integer.",

        answer: 67,
        type: "NAT",
        marks: 1
    },


    // =========================================================
    // Q17 - 2 MARKS - MCQ
    // =========================================================

    {
        question: "Which one of the following statements is CORRECT?",

        options: [
            "Atactic polypropylene is a hard, highly crystalline plastic",
            "Isotactic polypropylene crystallizes because its regular stereochemistry allows helical chain packing",
            "Syndiotactic polystyrene cannot crystallize",
            "Tacticity has no influence on Tm"
        ],

        answer: 1,
        type: "MCQ",
        marks: 2
    },


    // =========================================================
    // Q18 - 2 MARKS - MSQ
    // =========================================================

    {
        question: "Nylon 6,6 is made from hexamethylene diamine and adipic acid. For a sample with number-average molecular weight M̄n = 22,600 g/mol (repeat unit mass = 226 g/mol), which statements are CORRECT?",

        options: [
            "The degree of polymerization based on the repeat unit is 100",
            "The number of monomer molecules incorporated per chain is approximately 200",
            "X̄n from Carothers' equation would count 200 structural units, requiring p ≈ 0.995",
            "The repeat unit contains one amide linkage"
        ],

        answer: [0, 1, 2],
        type: "MSQ",
        marks: 2
    },


    // =========================================================
    // Q19 - 2 MARKS - MSQ
    // =========================================================

    {
        question: "Among the options given, identify the correct pair(s) of catalyst and co-catalyst that form a Ziegler-Natta catalyst. (G-23)",

        options: [
            "TiCl3 and Al(CH3CH2)2Cl",
            "ZnCl2 and Al(CH3)3",
            "TiO2 and Al(CH3)3",
            "VCl4 and Al(CH3CH2)2Cl"
        ],

        answer: [0, 3],
        type: "MSQ",
        marks: 2
    },


    // =========================================================
    // Q20 - 2 MARKS - MCQ
    // =========================================================

    {
        question: "Phenol-formaldehyde resin is prepared by:",

        options: [
            "Condensation polymerization",
            "Cationic polymerization",
            "Anionic polymerization",
            "Ring-opening polymerization"
        ],

        answer: 0,
        type: "MCQ",
        marks: 2
    },


    // =========================================================
    // Q21 - 2 MARKS - MSQ
    // =========================================================

    {
        question: "Consider an ideal step-growth polymerization involving multifunctional monomers. Which changes would favor formation of a crosslinked/gelled structure rather than a purely linear polymer?",

        options: [
            "Increasing the fraction of monomers having functionality greater than two",
            "Increasing conversion",
            "Introducing only strictly bifunctional monomers",
            "Increasing the number of possible inter-chain connections"
        ],

        answer: [0, 1, 3],
        type: "MSQ",
        marks: 2
    },


    // =========================================================
    // Q22 - 2 MARKS - NAT
    // =========================================================

    {
        question: "A polymerization mixture contains 60 mol% bifunctional molecules and 40 mol% trifunctional molecules. Assuming the percentages are mole fractions of molecules, determine the theoretical gel-point conversion to two decimal places.",

        answer: 0.83,
        type: "NAT",
        marks: 2
    },


    // =========================================================
    // Q23 - 2 MARKS - NAT
    // =========================================================

    {
        question: "A linear step-growth polymerization has a stoichiometric ratio r = 0.90 and reaches an extent of reaction p = 0.98. Determine the number-average degree of polymerization, Xn, to two decimal places.",

        answer: 13.97,
        type: "NAT",
        marks: 2
    },


    // =========================================================
    // Q24 - 2 MARKS - NAT
    // =========================================================

    {
        question: "Poly(hexamethylene adipamide) (Nylon-6,6) was synthesized by condensation polymerization of hexamethylenediamine and adipic acid in 1:1 mole ratio. Calculate the acid equivalent of the polymer whose average DP is 520. Enter the answer to two decimal places.",

        answer: 117538,
        type: "NAT",
        marks: 2
    },


    // =========================================================
    // Q25 - 2 MARKS - NAT
    // =========================================================

    {
        question: "A Nylon-6,6 polymer has an acid equivalent of 90418 g/acid equivalent. The molecular mass of the repeating unit is 226 g/mol. Determine the average degree of polymerization. Enter the answer to two decimal places.",

        answer: 400,
        type: "NAT",
        marks: 2
    },


    // =========================================================
    // Q26 - NOT USED
    // =========================================================

];
