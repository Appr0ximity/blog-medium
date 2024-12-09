export type propsType = {
    title: string,
    inputType: string,
    value: string,
    name: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export const TextBox = (props: propsType) => {
    return <div className="justify-center mt-4">
        <p className="text-white pl-2 text-3xl font-thin">{props.title}</p>
        <input
            required
            type={props.inputType}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            className=" pl-3 pr-40 pb-1 border-b bg-project-gray border-white outline-none text-white text-xl min-w-full " />
    </div>
}