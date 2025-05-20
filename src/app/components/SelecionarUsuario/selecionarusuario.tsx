type Props = {
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  };
  
  const cargo = ["Selecione um cargo","Engenheiro de Sistemas", "Controlador de Trafego", "Supervisor de Operacoes", "Operador de Centro de Controle", "Convidado"];
  
  const SelecionarUsuario: React.FC<Props> = ({ name, value, onChange }) => {
    return (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border border-[#3B48EF] text-black px-4 py-2 rounded-2xl w-full h-[60] "
      >
        {cargo.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
    );
  };
  
  export default SelecionarUsuario;
  