interface Props {
  error: string;
  closeModal: () => void;
};

export function ErrorModal({ error, closeModal }: Props) {
  return (
    <div
      id="defaultModal"
      className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0
                h-[calc(100%-1rem)] md:h-full flex justify-center items-center bg-gray-500 bg-opacity-30"
    >
      <div className="relative w-full h-full max-w-2xl md:h-auto">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-black">
          {/* <!-- Modal header --> */}
          <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Sorry
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center
              dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* <!-- Modal body --> */}
          <div className="p-6 space-y-6">
            <p className=" text-gray-800 dark:text-gray-400">
              {error}
            </p>
          </div>
          {/* <!-- Modal footer --> */}
          <div className="flex justify-center items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              type="button"
              onClick={closeModal}
              className="text-black font-semibold bg-[#18D860] hover:bg-[#1d9f4f] focus:ring-4 focus:outline-none focus:ring-[#44d27b]
                          rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>

  )
};