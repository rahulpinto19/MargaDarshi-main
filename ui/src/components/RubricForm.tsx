import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Rubric, RubricCriterion } from '../store/AppStore';

interface RubricFormProps {
  rubric: Rubric | null;
  onSave: (rubric: Rubric) => void;
}

const RubricForm: React.FC<RubricFormProps> = ({ rubric, onSave }) => {
  const [criteria, setCriteria] = React.useState<RubricCriterion[]>(
    rubric?.criteria || [
      { id: '1', name: 'Content Quality', maxMarks: 10, description: 'Quality and relevance of content' },
      { id: '2', name: 'Grammar & Spelling', maxMarks: 5, description: 'Language accuracy' },
      { id: '3', name: 'Structure', maxMarks: 5, description: 'Organization and flow' },
    ]
  );

  const addCriterion = () => {
    const newId = (Math.max(...criteria.map((c) => parseInt(c.id)), 0) + 1).toString();
    setCriteria([
      ...criteria,
      { id: newId, name: '', maxMarks: 0, description: '' },
    ]);
  };

  const removeCriterion = (id: string) => {
    setCriteria(criteria.filter((c) => c.id !== id));
  };

  const updateCriterion = (id: string, field: keyof RubricCriterion, value: string | number) => {
    setCriteria(
      criteria.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const handleSave = () => {
    const totalMarks = criteria.reduce((sum, c) => sum + c.maxMarks, 0);
    onSave({ criteria, totalMarks });
  };

  const totalMarks = criteria.reduce((sum, c) => sum + c.maxMarks, 0);

  return (
    <div className="glass-effect rounded-2xl p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-blue-700">
          Evaluation Rubric
        </h2>
        <div className="px-4 py-2 bg-blue-100 rounded-xl border-2 border-blue-300">
          <span className="text-sm text-gray-700">Total Marks: </span>
          <span className="text-xl font-bold text-blue-800">{totalMarks}</span>
        </div>
      </div>

      <div className="space-y-4">
        {criteria.map((criterion) => (
          <div key={criterion.id} className="border-2 border-blue-200 bg-white rounded-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Criterion Name
                </label>
                <input
                  type="text"
                  value={criterion.name}
                  onChange={(e) => updateCriterion(criterion.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Content Quality"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Marks
                </label>
                <input
                  type="number"
                  value={criterion.maxMarks}
                  onChange={(e) =>
                    updateCriterion(criterion.id, 'maxMarks', parseInt(e.target.value) || 0)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="10"
                  min="0"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={criterion.description}
                  onChange={(e) => updateCriterion(criterion.id, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe what this criterion evaluates..."
                  rows={2}
                />
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <button
                onClick={() => removeCriterion(criterion.id)}
                className="text-red-600 hover:text-red-800 text-sm flex items-center"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={addCriterion}
          className="flex items-center px-6 py-3 text-blue-600 hover:text-blue-800 font-semibold border-2 border-blue-300 rounded-xl hover:bg-blue-50 transition-all duration-300"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Criterion
        </button>
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold hover:bg-blue-700"
        >
          Save Rubric
        </button>
      </div>
    </div>
  );
};

export default RubricForm;

