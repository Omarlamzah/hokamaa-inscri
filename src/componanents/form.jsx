import { BiSend, BiCommentCheck, BiMessageError } from "react-icons/bi";
import React, { useState } from "react";
import axios from "axios";
import Loader from "./loader/Loader";
import {
  FaUserAlt, 
  FaBuilding,
  FaTrain,
  FaArrowRight,
  FaArrowLeft,
} from "react-icons/fa";
import { AiOutlineMail, AiOutlineHome } from "react-icons/ai";
import { BsFillPhoneFill } from "react-icons/bs";
import { API_URL } from "../var";

export default function Form() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tele: "",
    ville: "",
     moyen_transport: "",
    date_arrivee: "",
    heure_arrivee: "",
    atelier1: "",
    atelier2: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Available hours for each arrival date
  const hoursFor6Feb = [
    "14:10",
    "16:10",
    "17:10",
    "18:10",
    "19:10",
    "20:10",
    "21:10",
    "22:10",
    "23:10",
  ];
  const hoursFor7Feb = [
    "08:10",
    "09:10",
    "10:10",
    "11:10",
    "12:10",
    "13:10",
    "14:10",
    "15:10",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(formData);
      const response = await axios.post(API_URL, {
        ...formData, 
      });
      console.log(response);
      if (response.data.status === "success") {
        setMessage({ text: response.data.message, type: "success" });
      } else {
        setMessage({ text: "Failed to submit the form", type: "error" });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        text: "An error occurred. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Determine the available hours based on the selected arrival date
  const availableHours =
    formData.date_arrivee === "6 Février"
      ? hoursFor6Feb
      : formData.date_arrivee === "7 Février"
      ? hoursFor7Feb
      : [];

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {message.text ? (
            <div
              className={`flex items-center flex-col p-6 mb-6 rounded-lg text-white text-base md:text-lg lg:text-xl ${
                message.type === "success"
                  ? "bg-green-500 shadow-lg shadow-green-400/50"
                  : "bg-red-500 shadow-lg shadow-red-400/50"
              }`}
            >
              {message.type === "success" ? (
                <BiCommentCheck className="w-16 h-16 md:w-20 md:h-20 text-yellow-300" />
              ) : (
                <BiMessageError className="w-16 h-16 md:w-20 md:h-20 text-red-300" />
              )}
              <p className="mt-4 text-center">{message.text}</p>
            </div>
          ) : (
            <form
              className="bg-gradient-to-r from-gray-900 via-blue-600 to-green-600 p-6 md:p-10 lg:p-14 rounded-lg shadow-xl shadow-gray-900/50 space-y-6"
              onSubmit={handleSubmit}
            >
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold  text-white   text-center  my-0 mb-2">
                Inscription au Congrès
              </h2>
              <section className="flex gap-6">
                <div className="group transform transition-transform duration-500 hover:translate-y-1">
                  <FaUserAlt className="icon" />
                  <input
                    id="nom"
                    placeholder="Nom:"
                    name="nom"
                    required
                    type="text"
                    className="input"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                </div>
                <div className="group transform transition-transform duration-500 hover:translate-y-1">
                  <FaUserAlt className="icon" />
                  <input
                    id="prenom"
                    placeholder="Prénom:"
                    name="prenom"
                    required
                    type="text"
                    className="input"
                    value={formData.prenom}
                    onChange={handleChange}
                  />
                </div>
              </section>
              <div className="group transform transition-transform duration-500 hover:translate-y-1">
                <AiOutlineMail className="icon" />
                <input
                  id="email"
                  placeholder="Email:"
                  name="email"
                  required
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="group transform transition-transform duration-500 hover:translate-y-1">
                <BsFillPhoneFill className="icon" />
                <input
                  id="tele"
                  placeholder="Télephone:"
                  name="tele"
                  required
                  type="tel"
                  className="input"
                  value={formData.tele}
                  onChange={handleChange}
                />
              </div>
              <div className="group transform transition-transform duration-500 hover:translate-y-1">
                <AiOutlineHome className="icon" />
                <input
                  id="ville"
                  placeholder="Ville: "
                  name="ville"
                  required
                  type="text"
                  className="input"
                  value={formData.ville}
                  onChange={handleChange}
                />
              </div>
            
        
              <div className="group transform transition-transform duration-500 hover:translate-y-1">
                <FaTrain className="icon" />
                <select
                required
                  name="moyen_transport"
                  value={formData.moyen_transport}
                  onChange={handleChange}
                  className="input pl-[34px!important]"
                >
                  <option value="">Choisir le moyen de transport</option>
                   <option value="TGV">TGV</option>
                  <option value="Voiture">Voiture</option>
                </select>
              </div>
              <div className="group transform transition-transform duration-500 hover:translate-y-1">
                <select
                required
                  name="date_arrivee"
                  value={formData.date_arrivee}
                  onChange={handleChange}
                  className="input"
                >
                        <option value="">Choisir la Date et l'heure d'arrivée:</option>
                  <option value="6 Février">6 Février</option>
                  <option value="7 Février">7 Février</option>
                </select>
              </div>
              {formData.date_arrivee && (
                <div className="group transform transition-transform duration-500 hover:translate-y-1">
                  <select
                  required
                    name="heure_arrivee"
                    value={formData.heure_arrivee}
                    onChange={handleChange}
                    className="input"
                    disabled={!availableHours.length}
                  >
                    <option value="">Choisir une Heure d'arrivée:</option>
                    {availableHours.map((hour, index) => (
                      <option key={index} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                </div>
              )}
               
               <div className="flex flex-col pt-6">
  <label className="text-white" htmlFor="atelier1">
    Choix d'atelier (09:30 – 11:00):
  </label>
  <div className="group mt-5 transform transition-transform duration-500 hover:translate-y-1">
    <select
      required
      name="atelier1"
      value={formData.atelier1}
      onChange={handleChange}
      className="input"
    >
      <option value="">Sélectionner l'atelier</option>
      <option value="Échographie Mammaire - Pr. O. Kacimi">
        Échographie Mammaire - Pr. O. Kacimi
      </option>
      <option value="Dépistage du Cancer du Col - Pr. F. Mikou">
        Dépistage du Cancer du Col - Pr. F. Mikou
      </option>
      <option value="Électrophorèse des Protéines - Pr. A. Chakib">
        Électrophorèse des Protéines - Pr. A. Chakib
      </option>
    </select>
  </div>
</div>

<div className="flex flex-col -mt-4">
  <label className="text-white" htmlFor="atelier2">
    Choix d'atelier (11:30 – 13:00):
  </label>
  <div className="group mt-5 transform transition-transform duration-500 hover:translate-y-1">
    <select
      required
      name="atelier2"
      value={formData.atelier2}
      onChange={handleChange}
      className="input"
    >
      <option value="">Sélectionner l'atelier</option>
      <option value="La Coformulation IDEGASP - Dr. O. Tazi">
        La Coformulation IDEGASP - Dr. O. Tazi
      </option>
      <option value="PEC des Dyslipidémies - Dr. H. Najih">
        PEC des Dyslipidémies - Dr. H. Najih
      </option>
      <option value="Gynécologie Esthétique - Dr. P. Amsallem">
        Gynécologie Esthétique - Dr. P. Amsallem
      </option>
    </select>
  </div>
</div>



        




<div className=" w-full flex justify-center">
  
 <button className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase text-base">
  <span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px" />
  <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]" />
  <div className="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#21a9f2] via-[#072786] to-[#238a3e] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
    <span className="select-none">Soumettre</span>
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1">
      <path clipRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" fillRule="evenodd" />
    </svg>
  </div>
</button>



</div>
            </form>
          )}
        </>
      )}
    </>
  );
}
