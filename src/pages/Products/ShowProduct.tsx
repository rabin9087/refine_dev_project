import { useGo, useOne, useShow } from "@refinedev/core"
import { Show } from "@refinedev/mui"

const ShowProduct: React.FC = () => {

  const { queryResult } = useShow({})

  const { data, isLoading } = queryResult

  const record = data?.data

  const { data: product, isLoading: productIsLoading } = useOne({
    resource: "products", id: record?.products?.id || "", queryOptions: {
      enabled: !!record
    },
  })

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  const go = useGo()

  return (<Show isLoading={isLoading}>
    <div className="flex items-center gap-2 m-2 p-2">
      {/* <button
        onClick={() => {
          go({
            to: {
              resource: "products", action: "list"
            }
          })
        }}
        className="inline-block rounded ms-2 bg-button-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
        {"<"} Back
      </button> */}

    </div>
    <div className="flex justify-center items-center mt-2 gap-2 p-2 rounded-lg bg-base-primary shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-base-secondary">

      <img
        className="rounded-lg"
        width={"200px"}
        height={"200px"}
        src={record?.image}
        alt=""
      />

      <div className="w-2/3 p-4">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Title: {record?.title}
        </h5>

        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          Category: {record?.category}
        </p>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {record?.description}
        </p>
        <p className="text-white text-3xl font-bold mb-2">${record?.price}</p>

        <button
          type="button"
          className="inline-block rounded ms-2 bg-blue-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Buy
        </button>

      </div>
    </div>
  </Show>
  )
}

export default ShowProduct