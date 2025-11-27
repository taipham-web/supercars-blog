export default function SpecTable({ data }) {
  return (
    <div className="my-10 border-y border-gray-200 py-8">
      <h3 className="text-xl font-bold mb-6 uppercase tracking-widest">
        Specifications
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Engine
          </p>
          <p className="font-semibold">{data.engine}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Horsepower
          </p>
          <p className="font-semibold">{data.horsepower} HP</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            0-60 mph
          </p>
          <p className="font-semibold">{data.zero_to_sixty}s</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
            Top Speed
          </p>
          <p className="font-semibold">{data.top_speed_mph} mph</p>
        </div>
      </div>
    </div>
  );
}
