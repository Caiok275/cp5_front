import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type TypeFuncionario = {
    id: number;
    nome: string;
    cargo: string;
    setor: string;
    turno: string;
    salario: number;
};

export default function ListaFuncionario() {

    const [funcionario, setFuncionario] = useState<TypeFuncionario[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/funcionario')
            .then((resp) => resp.json())
            .then((resp) => setFuncionario(resp))
            .catch((error) => console.log(error));
    }, []);

    const handleDelete = (id: number) => {
        fetch(`http://localhost:5000/funcionario/${id}`, { method: "DELETE" })
            .then(() => setFuncionario((prev) => prev.filter((p) => p.id !== id)))
            .catch((error) => console.log(error));
    };

    return (
        <div className="w-3/4 mt-8 m-auto">
            <Link to="/" className="p-2.5 bg-red-600 text-white font-bold rounded-md hover:bg-red-800 mr-4">
                Voltar para a tela inicial
            </Link>
            <Link className="p-2.5 bg-green-600 text-white font-bold rounded-md" to={'/incluir'}>
                Inserir Funcionário
            </Link>
            <table className="w-full border-2 border-gray-400 my-5">
                <thead>
                    <tr className="p-2.5 bg-gray-500 text-white">
                        <th>Nome</th><th>Cargo</th><th>Setor</th><th>Turno</th><th>Salário</th><th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {funcionario.map((func) => (
                        <tr className="even:bg-gray-400 text-center p-2.5" key={func.id}>
                            <td>{func.nome}</td>
                            <td>{func.cargo}</td>
                            <td>{func.setor}</td>
                            <td>{func.turno}</td>
                            <td>R$ {func.salario.toFixed(2)}</td>
                            <td>
                                <Link
                                    className="m-1 bg-blue-600 text-white px-2 pb-1 rounded-md hover:font-bold"
                                    to={`/editar/${func.id}`}> Editar
                                </Link>
                                <button
                                    className="m-1 bg-red-600 text-white px-2 pb-0.75 rounded-md hover:font-bold"
                                    onClick={() => handleDelete(func.id)}> Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="p-2.5 bg-gray-700 text-center text-white">
                        <td colSpan={6}>Funcionários</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
