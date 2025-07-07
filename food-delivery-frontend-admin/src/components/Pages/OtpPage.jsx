const OtpPage = ({ response }) => {
  console.log(response);
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-white dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h1 className="text-center text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Enter OTP sent to Super Admin
        </h1>
        <form className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Enter OTP"
            className="input input-bordered w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
            required
          />
          <button type="submit" className="btn btn-primary w-full">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;
