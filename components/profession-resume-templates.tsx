// Standard reference data for each profession
const professionReferenceData = {
  driver: {
    name: "Rajesh Kumar",
    email: "rajesh.driver@email.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra",
    summary:
      "Experienced and reliable driver with 8+ years of safe driving experience. Excellent knowledge of city routes and traffic regulations. Committed to punctuality and customer satisfaction.",
    experience: [
      {
        title: "Professional Driver",
        company: "Ola Cabs",
        duration: "2020 - Present",
        description:
          "Providing safe and reliable transportation services to customers across Mumbai. Maintained 4.8+ star rating with excellent customer feedback.",
      },
      {
        title: "Delivery Driver",
        company: "Amazon Logistics",
        duration: "2018 - 2020",
        description:
          "Handled package delivery across multiple zones. Consistently met delivery targets with zero damage complaints.",
      },
    ],
    education: [
      {
        degree: "Class 12th",
        institution: "Government High School",
        year: "2015",
      },
    ],
    skills: ["Safe Driving", "Route Planning", "Vehicle Maintenance", "Customer Service", "GPS Navigation"],
    // Driver-specific fields
    licenseType: "Commercial Driving License",
    licenseNumber: "MH-02-20180001234",
    vehicleTypes: ["Car", "Truck", "Auto-rickshaw"],
    yearsOfExperience: "8+ years",
    accidentFree: "Yes - 8 years accident-free record",
  },

  tailor: {
    name: "Meera Sharma",
    email: "meera.tailor@email.com",
    phone: "+91 87654 32109",
    address: "Delhi, India",
    summary:
      "Skilled tailor with 10+ years of experience in custom clothing design and alterations. Expert in traditional and modern stitching techniques with attention to detail and quality craftsmanship.",
    experience: [
      {
        title: "Senior Tailor",
        company: "Fashion Point Boutique",
        duration: "2019 - Present",
        description:
          "Creating custom garments and handling alterations for premium clientele. Specialized in bridal wear and formal clothing.",
      },
      {
        title: "Tailor",
        company: "Local Tailoring Shop",
        duration: "2014 - 2019",
        description: "Provided tailoring services for everyday clothing, uniforms, and special occasion wear.",
      },
    ],
    education: [
      {
        degree: "Diploma in Fashion Design",
        institution: "Delhi Fashion Institute",
        year: "2013",
      },
    ],
    skills: ["Hand Stitching", "Machine Stitching", "Pattern Making", "Alterations", "Embroidery"],
    // Tailor-specific fields
    specializations: ["Bridal Wear", "Formal Suits", "Traditional Clothing"],
    machineTypes: ["Singer", "Brother", "Overlock Machine"],
    fabricExpertise: ["Cotton", "Silk", "Wool", "Synthetic"],
    servicesOffered: ["Custom Tailoring", "Alterations", "Repairs", "Embroidery"],
  },

  electrician: {
    name: "Suresh Patel",
    email: "suresh.electrician@email.com",
    phone: "+91 76543 21098",
    address: "Ahmedabad, Gujarat",
    summary:
      "Certified electrician with 12+ years of experience in residential and commercial electrical work. Expert in installation, maintenance, and repair of electrical systems with strong safety record.",
    experience: [
      {
        title: "Senior Electrician",
        company: "Gujarat Electrical Services",
        duration: "2018 - Present",
        description:
          "Leading electrical installation and maintenance projects for commercial buildings. Supervising junior electricians and ensuring safety compliance.",
      },
      {
        title: "Electrician",
        company: "Home Service Solutions",
        duration: "2012 - 2018",
        description: "Provided residential electrical services including wiring, repairs, and appliance installation.",
      },
    ],
    education: [
      {
        degree: "ITI in Electrical",
        institution: "Government ITI, Ahmedabad",
        year: "2011",
      },
    ],
    skills: ["Electrical Wiring", "Circuit Installation", "Troubleshooting", "Safety Protocols", "Motor Repair"],
    // Electrician-specific fields
    certifications: ["ITI Electrical", "Safety Training Certificate"],
    specializations: ["Home Wiring", "Industrial Electrical", "Motor Repair"],
    voltageExperience: ["220V Domestic", "440V Industrial", "High Voltage"],
    safetyRecord: "12 years accident-free work record",
  },

  cook: {
    name: "Priya Reddy",
    email: "priya.cook@email.com",
    phone: "+91 65432 10987",
    address: "Hyderabad, Telangana",
    summary:
      "Passionate cook with 6+ years of experience in preparing delicious and hygienic meals. Skilled in multiple cuisines with expertise in both home cooking and restaurant-style preparation.",
    experience: [
      {
        title: "Head Cook",
        company: "Spice Garden Restaurant",
        duration: "2021 - Present",
        description:
          "Managing kitchen operations and preparing authentic South Indian and North Indian dishes. Training junior cooks and maintaining food quality standards.",
      },
      {
        title: "Home Cook",
        company: "Various Families",
        duration: "2018 - 2021",
        description:
          "Provided home cooking services for multiple families, preparing healthy and tasty meals according to dietary preferences.",
      },
    ],
    education: [
      {
        degree: "Certificate in Culinary Arts",
        institution: "Hyderabad Culinary Institute",
        year: "2017",
      },
    ],
    skills: ["Indian Cuisine", "Food Safety", "Menu Planning", "Spice Knowledge", "Kitchen Management"],
    // Cook-specific fields
    cuisineSpecialty: ["South Indian", "North Indian", "Chinese", "Continental"],
    dietaryExpertise: ["Vegetarian", "Non-Vegetarian", "Diabetic-Friendly", "Low-Oil Cooking"],
    kitchenEquipment: ["Gas Stove", "Pressure Cooker", "Tandoor", "Commercial Kitchen"],
    foodSafetyCertification: "Yes - Food Handler's License",
  },

  delivery: {
    name: "Amit Singh",
    email: "amit.delivery@email.com",
    phone: "+91 54321 09876",
    address: "Pune, Maharashtra",
    summary:
      "Dedicated delivery partner with 5+ years of experience in food delivery and courier services. Known for timely deliveries and excellent customer service with strong knowledge of city routes.",
    experience: [
      {
        title: "Delivery Partner",
        company: "Swiggy",
        duration: "2020 - Present",
        description:
          "Delivering food orders across Pune with 4.9 star rating. Consistently meeting delivery time targets and maintaining customer satisfaction.",
      },
      {
        title: "Courier Delivery",
        company: "Blue Dart",
        duration: "2019 - 2020",
        description: "Handled package delivery and pickup services for business and residential customers.",
      },
    ],
    education: [
      {
        degree: "Class 10th",
        institution: "Maharashtra State Board",
        year: "2018",
      },
    ],
    skills: ["Route Navigation", "Time Management", "Customer Service", "Package Handling", "Mobile Apps"],
    // Delivery-specific fields
    vehicleOwned: "Two-wheeler (Honda Activa)",
    deliveryZones: ["Pune Central", "Kothrud", "Wakad", "Hinjewadi"],
    averageDeliveries: "25-30 orders per day",
    customerRating: "4.9/5 stars",
    workingHours: "Flexible - 8-10 hours daily",
  },
}

// Template components for each profession
export const DriverTemplate1 = ({ data }: { data: any }) => (
  <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg">
    <div className="border-l-4 border-blue-600 pl-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <p className="text-lg text-blue-600 font-semibold">Professional Driver</p>
      <div className="mt-2 text-gray-600">
        <p>
          {data.email} • {data.phone}
        </p>
        <p>{data.address}</p>
      </div>
    </div>

    {data.licenseType && (
      <div className="mb-6 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">License Information</h3>
        <p>
          <strong>License Type:</strong> {data.licenseType}
        </p>
        {data.licenseNumber && (
          <p>
            <strong>License Number:</strong> {data.licenseNumber}
          </p>
        )}
        {data.vehicleTypes && (
          <p>
            <strong>Vehicle Types:</strong> {data.vehicleTypes.join(", ")}
          </p>
        )}
        {data.accidentFree && (
          <p>
            <strong>Safety Record:</strong> {data.accidentFree}
          </p>
        )}
      </div>
    )}

    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional Summary</h3>
      <p className="text-gray-700 leading-relaxed">{data.summary}</p>
    </div>

    {data.experience && data.experience.length > 0 && (
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Experience</h3>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4 border-l-2 border-gray-200 pl-4">
            <h4 className="font-semibold text-gray-900">{exp.title}</h4>
            <p className="text-blue-600">
              {exp.company} • {exp.duration}
            </p>
            <p className="text-gray-700 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>
    )}

    {data.skills && data.skills.length > 0 && (
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string, index: number) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
)

export const TailorTemplate1 = ({ data }: { data: any }) => (
  <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg">
    <div className="text-center mb-6 border-b-2 border-pink-200 pb-6">
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <p className="text-lg text-pink-600 font-semibold">Professional Tailor</p>
      <div className="mt-2 text-gray-600">
        <p>
          {data.email} • {data.phone}
        </p>
        <p>{data.address}</p>
      </div>
    </div>

    {data.specializations && (
      <div className="mb-6 bg-pink-50 p-4 rounded-lg">
        <h3 className="font-semibold text-pink-800 mb-2">Specializations</h3>
        <div className="grid grid-cols-2 gap-2">
          {data.specializations.map((spec: string, index: number) => (
            <span key={index} className="bg-pink-100 text-pink-800 px-2 py-1 rounded text-sm">
              {spec}
            </span>
          ))}
        </div>
        {data.servicesOffered && (
          <div className="mt-3">
            <p>
              <strong>Services:</strong> {data.servicesOffered.join(", ")}
            </p>
          </div>
        )}
      </div>
    )}

    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional Summary</h3>
      <p className="text-gray-700 leading-relaxed">{data.summary}</p>
    </div>

    {data.experience && data.experience.length > 0 && (
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Experience</h3>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900">{exp.title}</h4>
            <p className="text-pink-600">
              {exp.company} • {exp.duration}
            </p>
            <p className="text-gray-700 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>
    )}

    {data.skills && data.skills.length > 0 && (
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string, index: number) => (
            <span key={index} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
)

// Similar templates for other professions...
export const ElectricianTemplate1 = ({ data }: { data: any }) => (
  <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg">
    <div className="bg-yellow-50 p-6 rounded-lg mb-6">
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <p className="text-lg text-yellow-600 font-semibold">Certified Electrician</p>
      <div className="mt-2 text-gray-600">
        <p>
          {data.email} • {data.phone}
        </p>
        <p>{data.address}</p>
      </div>
    </div>

    {data.certifications && (
      <div className="mb-6 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">Certifications & Safety</h3>
        <p>
          <strong>Certifications:</strong> {data.certifications.join(", ")}
        </p>
        {data.safetyRecord && (
          <p>
            <strong>Safety Record:</strong> {data.safetyRecord}
          </p>
        )}
        {data.specializations && (
          <p>
            <strong>Specializations:</strong> {data.specializations.join(", ")}
          </p>
        )}
      </div>
    )}

    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-3">Professional Summary</h3>
      <p className="text-gray-700 leading-relaxed">{data.summary}</p>
    </div>

    {data.experience && data.experience.length > 0 && (
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Experience</h3>
        {data.experience.map((exp: any, index: number) => (
          <div key={index} className="mb-4 border-l-4 border-yellow-400 pl-4">
            <h4 className="font-semibold text-gray-900">{exp.title}</h4>
            <p className="text-yellow-600">
              {exp.company} • {exp.duration}
            </p>
            <p className="text-gray-700 mt-1">{exp.description}</p>
          </div>
        ))}
      </div>
    )}

    {data.skills && data.skills.length > 0 && (
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Skills</h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill: string, index: number) => (
            <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
)

// Export reference data for use in other components
export { professionReferenceData }
