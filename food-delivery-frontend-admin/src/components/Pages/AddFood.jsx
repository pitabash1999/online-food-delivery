import React, { useContext, useState } from "react";

import CreatableSelect from "react-select/creatable";
import addFood from "../../assets/fast-food.png";
import { addNewFood } from "../../Utils/Api";
import toast from "react-hot-toast";
import { FoodContext } from "../../store/ContextProvider";

const AddFood = () => {
  const [image, setImage] = useState(addFood);
  const [previewImage, setPreviewImage] = useState(addFood);
  const [loading, setLoading] = useState(false);
  const { dispatch } = FoodContext();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setImage(addFood);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const categoryOptions = [
    { value: "Biriyani", label: "Biriyani" },
    { value: "Burger", label: "Burger" },
    { value: "Bhinese", label: "Chinese" },
    { value: "Roll", label: "Roll" },
    { value: "Ice-cream", label: "Ice Cream" },
    { value: "Dosa", label: "Dosa" },
  ];

  const customSelectStyles = {
    menu: (provided) => ({
      ...provided,
      maxHeight: "150px",
      overflowY: "auto",
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("foodRequest", JSON.stringify(formData));
    formDataToSend.append("file", image);

    try {
      setLoading(true);
      const response = await addNewFood(formDataToSend);
      dispatch({
        type: "ADD_FOOD",
        payload: response,
      });
      toast.success("Food added successfully!");
    } catch (error) {
      toast.error("Failed to add food. Please try again.");
      console.error("Error adding food:", error);
    } finally {
      setLoading(false);
    }

    setFormData({
      name: "",
      price: "",
      category: "",
      description: "",
    });
    setImage(addFood);
  };

  return (
    <div className="flex items-center justify-center min-h-max mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 shadow-lg p-4 rounded-lg w-full max-w-md min-h-max bg-slate-700"
      >
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-bold flex items-center gap-2 justify-center text-white">
            <img src={addFood} className="w-6 h-6" alt="" />
            Add food
          </h1>
          <img src={previewImage} alt="" className="w-12 h-14" />
        </div>

        <div className="form-control w-full flex flex-col gap-4">
          <input
            type="file"
            className="file-input file-input-bordered file-input-neutral w-full dark:text-white"
            onChange={handleImage}
            required
          />

          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full text-black dark:text-white"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Price"
            className="input input-bordered w-full text-black dark:text-white"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />

          <CreatableSelect
            options={categoryOptions}
            styles={customSelectStyles}
            placeholder="Category"
            onChange={(selectedOption) => {
              setFormData({
                ...formData,
                category: selectedOption?.value || "",
              });
            }}
            value={
              formData.category
                ? categoryOptions.find(
                    (opt) => opt.value === formData.category
                  ) || { value: formData.category, label: formData.category }
                : null
            }
            className="text-black"
            classNamePrefix="react-select"
          />

          <textarea
            placeholder="Description"
            className="textarea textarea-bordered w-full text-black dark:text-white"
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {loading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            "Add"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddFood;
