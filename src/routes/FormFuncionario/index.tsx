import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

type TypeNovo = {
    nome:string,
    cargo:string,
    setor:string,
    turno:string,
    salario:string
}

export default function FormFuncionario(){

    const {id} = useParams()

    const navegacao = useNavigate()

    const [novo, setNovo] = useState<TypeNovo>(
        {nome:"", cargo:"",setor:"",turno:"",salario:""}
    )

    let metodo:string = "POST"

    if(id) metodo = "PUT"

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value} = e.target
        setNovo({...novo,[name]:value})
    }

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const funcionario = {...novo, salario:Number(novo.salario)}
        fetch(`http://localhost:5000/funcionario/${id ? id : ""}`,{
            method:metodo,
            headers:{"Content-Type":"Application/json"},
            body: JSON.stringify(funcionario)
        })
        .then(()=>navegacao('/'))
        .catch(error=>console.log(error))
    }

    useEffect(()=>{
        if(id){
            fetch(`http://localhost:5000/funcionario/${id}`)
            .then(resp=>resp.json())
            .then(data=>setNovo(data))
            .catch(error=>console.log(error)
            )
        }
    },[id])

    return(
        <div className="max-w-2xl m-auto my-7">
            <h1 className="text-5xl text-center font-bold mb-8">Preencha o formulário</h1>

            <form className="border-2 border-gray-400 p-4 rounded-md" onSubmit={handleSubmit}>
                <input className="border-2 border-gray-400 rounded-md p-2 w-full mb-1" type="text" name="nome" value={novo?.nome} placeholder="Nome" onChange={handleChange}/><br />
                <input className="border-2 border-gray-400 rounded-md p-2 w-full mb-1" type="text" name="cargo" value={novo?.cargo} placeholder="Cargo" onChange={handleChange}/><br />
                <input className="border-2 border-gray-400 rounded-md p-2 w-full mb-1" type="text" name="setor" value={novo?.setor} placeholder="Setor" onChange={handleChange} /><br />
                <input className="border-2 border-gray-400 rounded-md p-2 w-full mb-1" type="text" name="turno" value={novo?.turno} placeholder="Turno" onChange={handleChange} /><br />
                <input className="border-2 border-gray-400 rounded-md p-2 w-full mb-1" type="number" name="salario" value={novo?.salario} placeholder="Salário" onChange={handleChange} /><br />
                <button className="bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-3" type="submit">Enviar</button>
                <Link className="bg-red-700 text-white font-bold py-2 px-4 rounded-md" to={"/"}>Cancelar</Link>
            </form>
        </div>
    )
}